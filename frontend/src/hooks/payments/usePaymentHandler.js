import { useReducer } from 'react';
import { toast } from 'sonner';
import { placeBid } from '@/services/bidService';
import { emitNewBid } from '@/lib/socketEvents';
import { useAuth } from '@/context/AuthContext';

const initialState = {
  isPaymentModalOpen: false,
  pendingBidAmount: null,
  activeListingId: null,
  onSuccessCallback: null,
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

  const openPaymentModal = ({ listingId, amount, onSuccess }) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to place a bid!');
      return;
    }
    dispatch({ type: 'OPEN_MODAL', payload: { listingId, amount, onSuccess } });
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const newBid = await placeBid({
        listingId: state.activeListingId,
        userId: user.id,
        paymentIntentId,
        amount: state.pendingBidAmount,
      });

      emitNewBid(state.activeListingId, newBid);

      if (state.onSuccessCallback) state.onSuccessCallback(newBid);

      toast.success('Bid placed successfully!');
      dispatch({ type: 'CLOSE_MODAL' });
    } catch (err) {
      console.error('Failed to place bid:', err);
      toast.error(err.message || 'Bid failed.');
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
