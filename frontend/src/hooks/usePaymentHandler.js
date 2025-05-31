import { useState } from 'react';
import { toast } from 'sonner';
import { placeBid } from '@/services/bidService';
import { emitNewBid } from '@/lib/socketEvents';
import { useAuth } from '@/context/AuthContext';

const usePaymentHandler = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingBidAmount, setPendingBidAmount] = useState(null);
  const [activeListingId, setActiveListingId] = useState(null);
  const [onSuccessCallback, setOnSuccessCallback] = useState(null);

  const { user, isAuthenticated } = useAuth();

  const openPaymentModal = ({ listingId, amount, onSuccess }) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to place a bid!');
      return;
    }
    setActiveListingId(listingId);
    setPendingBidAmount(amount);
    setOnSuccessCallback(() => onSuccess);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const newBid = await placeBid({
        listingId: activeListingId,
        userId: user._id,
        paymentIntentId,
        amount: pendingBidAmount,
      });

      emitNewBid(activeListingId, newBid);

      if (onSuccessCallback) onSuccessCallback(newBid);

      toast.success('Bid placed successfully!');
      setIsPaymentModalOpen(false);
      setPendingBidAmount(null);
      setActiveListingId(null);
    } catch (err) {
      console.error('Failed to place bid:', err);
      toast.error(err.message || 'Bid failed.');
    }
  };

  const handlePaymentCancel = () => {
    setIsPaymentModalOpen(false);
    setPendingBidAmount(null);
    setActiveListingId(null);
  };

  return {
    openPaymentModal,
    handlePaymentSuccess,
    handlePaymentCancel,
    isPaymentModalOpen,
    pendingBidAmount,
    activeListingId,
  };
};

export default usePaymentHandler;
