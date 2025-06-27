import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';
import { toast } from 'sonner';
import { maxPossibleBidAmount } from '@/constants/constants';

export const useListingValidations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const validateBidder = useCallback(
    (listing) => {
      if (!user) {
        toast.error('You must be logged in to place a bid!');
        navigate(ROUTES.LOGIN);
        return false;
      }

      if (!listing) {
        toast.error('Listing not found.');
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

      return true;
    },
    [user, navigate]
  );

  const validateBidAmount = useCallback((listing, bidAmount) => {
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
  }, []);

  const validateBuyNow = useCallback(
    (listing) => {
      if (!user) {
        toast.error('You must be logged in to buy!');
        navigate(ROUTES.LOGIN);
        return false;
      }

      if (!listing) {
        toast.error('Listing not found.');
        return false;
      }

      if (user._id === listing?.sellerId) {
        toast.error('You cannot buy your own listing');
        return false;
      }

      if (listing?.isSold) {
        toast.error('This listing is already sold.');
        return false;
      }

      return true;
    },
    [user, navigate]
  );

  return {
    validateBidder,
    validateBidAmount,
    validateBuyNow,
  };
};
