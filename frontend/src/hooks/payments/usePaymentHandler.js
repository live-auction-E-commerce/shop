import { useReducer, useCallback } from 'react';
import { toast } from 'sonner';
import { placeBid } from '@/services/bidService';
import { markListingAsSold } from '@/services/listingService';
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
  const { user, isAuthenticated, defaultAddress } = useAuth();

  const openPaymentModal = useCallback(
    ({ listingId, amount, onSuccess, mode = 'bid' }) => {
      if (!isAuthenticated) {
        toast.error('You must be logged in to make a payment!');
        return;
      }
      dispatch({
        type: 'OPEN_MODAL',
        payload: { listingId, amount, onSuccess, mode },
      });
    },
    [isAuthenticated]
  );

  const { mode, activeListingId, pendingBidAmount, onSuccessCallback } = state;

  const handlePaymentSuccess = useCallback(
    async (paymentIntentId) => {
      try {
        if (mode === 'bid') {
          const newBid = await placeBid({
            listingId: activeListingId,
            userId: user._id,
            paymentIntentId,
            amount: pendingBidAmount,
          });

          emitNewBid(activeListingId, newBid);
          onSuccessCallback?.(newBid);
          toast.success('Bid placed successfully!');
        } else if (mode === 'buyNow') {
          if (!defaultAddress || !defaultAddress._id) {
            toast.error('No default address found. Please set one before purchasing.');
            return;
          }

          const result = await markListingAsSold({
            listingId: activeListingId,
            paymentIntentId,
            amount: pendingBidAmount,
          });

          emitPurchase({ listingId: result._id });

          await createOrder({
            buyerId: user._id,
            sellerId: result.sellerId,
            listingId: result._id,
            addressId: defaultAddress._id,
            price: result.price,
          });

          onSuccessCallback?.(result);
          toast.success('Listing purchased and order created successfully!');
        }

        dispatch({ type: 'CLOSE_MODAL' });
      } catch (err) {
        console.error('Payment handler failed:', err);
        toast.error(err.message || 'Something went wrong during payment.');
      }
    },
    [mode, activeListingId, pendingBidAmount, onSuccessCallback, user, defaultAddress]
  );

  const handlePaymentCancel = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  return {
    openPaymentModal,
    handlePaymentSuccess,
    handlePaymentCancel,
    ...state,
  };
};

export default usePaymentHandler;
