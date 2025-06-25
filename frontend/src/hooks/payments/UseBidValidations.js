import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';
import { toast } from 'sonner';
import { maxPossibleBidAmount } from '@/constants/constants';

export const useBidValidations = (listing) => {
  const { user, defaultAddress } = useAuth();
  const navigate = useNavigate();

  const validateBidder = useCallback(() => {
    if (!user) {
      toast.error('You must be logged in to place a bid!');
      navigate(ROUTES.LOGIN);
      return false;
    }

    if (user._id === listing?.sellerId) {
      toast.error('You cannot bid on your own listing');
      return false;
    }

    if (user._id === listing?.currentBid?.userId) {
      toast.error('You own the highest bid already');
      return false;
    }
    if (!defaultAddress) {
      toast.error('You must have a default address to place a bid');
      return false;
    }

    return true;
  }, [user, listing, defaultAddress, navigate]);
  const validateBidAmount = useCallback(
    (bidAmount) => {
      const currentBidAmount = listing?.currentBid?.amount || listing?.startingBid;

      if (bidAmount <= currentBidAmount) {
        toast.error('Bid must be greater than current bid');
        return false;
      }

      if (bidAmount >= maxPossibleBidAmount) {
        toast.error(`Maximum bid is: $${maxPossibleBidAmount.toLocaleString()}`);
        return false;
      }

      return true;
    },
    [listing]
  );

  return {
    validateBidder,
    validateBidAmount,
  };
};
