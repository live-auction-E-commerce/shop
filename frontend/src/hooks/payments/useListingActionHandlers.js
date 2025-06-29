import { useCallback } from 'react';
import { toast } from 'sonner';
import { emitNewBid, emitPurchase } from '@/lib/socketEvents';
import { placeBid } from '@/services/bidService';
import { markListingAsSold } from '@/services/listingService';
import { createOrder } from '@/services/orderService';
import { getListingById } from '@/services/listingService';
import { useAuth } from '@/context/AuthContext';
import { useBidContext } from '@/context/BidContext';
import { useListingValidations } from '../listings/useListingValidations';

export const useListingActionHandlers = ({
  setListing,
  setListings,
  startPaymentFlow,
  resetFlow,
  paymentDetails,
}) => {
  const { user } = useAuth();
  const { setLatestBid } = useBidContext();
  const { validateBidder, validateBidAmount, validateBuyNow } = useListingValidations();

  const updateListingState = useCallback(
    (updatedListing) => {
      if (setListings) {
        setListings((prev) => {
          return prev.map((l) => (l._id === updatedListing._id ? { ...l, ...updatedListing } : l));
        });
      } else if (setListing) {
        setListing(updatedListing);
      }
    },
    [setListing, setListings]
  );

  const removeListing = useCallback(
    (listingId) => {
      if (setListings) {
        setListings((prev) => prev.filter((l) => l._id !== listingId));
      }
      if (setListing) {
        setListing(null);
      }
    },
    [setListing, setListings]
  );

  const handleBuyNowClick = useCallback(
    (listing) => {
      if (!validateBuyNow(listing)) return;
      if (setListing) setListing(listing);
      startPaymentFlow({
        listingId: listing._id,
        amount: listing.price,
        mode: 'buyNow',
      });
    },
    [validateBuyNow, setListing, startPaymentFlow]
  );

  const handleBidClick = useCallback(
    (listing, bidAmount) => {
      if (!validateBidder(listing)) return;
      if (bidAmount && !validateBidAmount(listing, bidAmount)) return;

      if (setListings && setListing) {
        setListing(listing);
      }

      if (bidAmount) {
        startPaymentFlow({
          listingId: listing._id,
          mode: 'bid',
          amount: bidAmount,
        });
      } else {
        startPaymentFlow({
          listingId: listing._id,
          mode: 'bid',
        });
      }
    },
    [validateBidder, validateBidAmount, setListing, startPaymentFlow, setListings]
  );

  const handlePaymentSuccess = useCallback(
    async (result) => {
      try {
        let updatedListing = null;
        if (paymentDetails.mode === 'bid') {
          const newBid = await placeBid({
            listingId: paymentDetails.listingId,
            userId: user._id,
            paymentIntentId: result,
            amount: paymentDetails.amount,
          });

          setLatestBid(newBid);
          emitNewBid(paymentDetails.listingId, newBid);
          toast.success('Bid placed successfully!');

          updatedListing = await getListingById(paymentDetails.listingId);
          updateListingState(updatedListing);
        } else if (paymentDetails.mode === 'buyNow') {
          const soldListing = await markListingAsSold({
            listingId: paymentDetails.listingId,
            paymentIntentId: result.paymentIntentId,
            amount: paymentDetails.amount,
          });

          emitPurchase({ listingId: soldListing._id });

          await createOrder({
            buyerId: user._id,
            sellerId: soldListing.sellerId,
            listingId: soldListing._id,
            addressId: paymentDetails.addressId,
            price: soldListing.price,
          });

          if (setListings) {
            removeListing(soldListing._id);
          } else if (setListing) {
            updatedListing = await getListingById(paymentDetails.listingId);
            updateListingState(updatedListing);
          }

          toast.success('Purchase successful!');
        }
      } catch (err) {
        console.error('Payment failed:', err);
        toast.error('Failed to update listing after payment.');
      } finally {
        resetFlow();
      }
    },
    [
      paymentDetails,
      user,
      resetFlow,
      setLatestBid,
      removeListing,
      updateListingState,
      setListing,
      setListings,
    ]
  );

  return {
    handleBuyNowClick,
    handleBidClick,
    handlePaymentSuccess,
  };
};
