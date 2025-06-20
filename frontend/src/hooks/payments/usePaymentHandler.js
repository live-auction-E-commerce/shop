import { useReducer } from 'react';
import { toast } from 'sonner';
import { placeBid } from '@/services/bidService';
import { markListingAsSold } from '@/services/listingService';
import { getDefaultAddressByUserId } from '@/services/addressService';
import { createOrder } from '@/services/orderService';
import { emitNewBid, emitPurchase } from '@/lib/socketEvents';
import { useAuth } from '@/context/AuthContext';

const initialState = {
  isPaymentModalOpen: false,
  pendingBidAmount: null,
  activeListingId: null,
  onSuccessCallback: null,
  mode: 'bid',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isPaymentModalOpen: true,
        activeListingId: action.payload.listingId,
        pendingBidAmount: action.payload.amount,
        onSuccessCallback: action.payload.onSuccess,
        mode: action.payload.mode || 'bid',
      };
    case 'CLOSE_MODAL':
      return initialState;
    default:
      return state;
  }
};

const usePaymentHandler = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = useAuth();

  const openPaymentModal = ({ listingId, amount, onSuccess, mode = 'bid' }) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to make a payment!');
      return;
    }
    dispatch({
      type: 'OPEN_MODAL',
      payload: { listingId, amount, onSuccess, mode },
    });
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      if (state.mode === 'bid') {
        const newBid = await placeBid({
          listingId: state.activeListingId,
          userId: user._id,
          paymentIntentId,
          amount: state.pendingBidAmount,
        });

        emitNewBid(state.activeListingId, newBid);
        if (state.onSuccessCallback) state.onSuccessCallback(newBid);
        toast.success('Bid placed successfully!');
      } else if (state.mode === 'buyNow') {
        const defaultAddress = await getDefaultAddressByUserId(user._id);
        if (!defaultAddress || !defaultAddress._id) {
          toast.error('No default address found. Please set one before purchasing.');
          return;
        }

        const result = await markListingAsSold({
          listingId: state.activeListingId,
          paymentIntentId,
          amount: state.pendingBidAmount,
        });

        emitPurchase({ listingId: result._id });

        await createOrder({
          buyerId: user._id,
          sellerId: result.sellerId,
          listingId: result._id,
          addressId: defaultAddress._id,
          price: result.price,
        });

        if (state.onSuccessCallback) state.onSuccessCallback(result);
        toast.success('Listing purchased and order created successfully!');
      }

      dispatch({ type: 'CLOSE_MODAL' });
    } catch (err) {
      console.error('Payment handler failed:', err);
      toast.error(err.message || 'Something went wrong during payment.');
    }
  };

  const handlePaymentCancel = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return {
    openPaymentModal,
    handlePaymentSuccess,
    handlePaymentCancel,
    ...state,
  };
};

export default usePaymentHandler;
