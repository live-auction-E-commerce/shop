import { useCallback } from 'react';
import { toast } from 'sonner';
import { emitNewBid, emitPurchase } from '@/lib/socketEvents';
import { placeBid } from '@/services/bidService';
import { markListingAsSold } from '@/services/listingService';
import { createOrder } from '@/services/orderService';
import { getListingById } from '@/services/listingService';
import { useAuth } from '@/context/AuthContext';
import { useBidContext } from '@/context/BidContext';

export const useListingHandlers = ({
  listing,
  setListing,
  startPaymentFlow,
  resetFlow,
  paymentDetails,
}) => {
  const { user } = useAuth();
  const { setLatestBid } = useBidContext();

  const handleBidClick = useCallback(
    (bidAmount) => {
      startPaymentFlow({
        listingId: listing._id,
        amount: bidAmount,
        mode: 'bid',
      });
    },
    [listing, startPaymentFlow]
  );

  const handleBuyNowClick = useCallback(() => {
    startPaymentFlow({
      listingId: listing._id,
      amount: listing.price,
      mode: 'buyNow',
    });
  }, [listing, startPaymentFlow]);

  // TODO: We need to also pass the selected address by the user with each bid now

  const handlePaymentSuccess = useCallback(
    async (result) => {
      try {
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
        } else if (paymentDetails.mode === 'buyNow') {
          if (!paymentDetails.addressId) {
            toast.error('No address selected. Please select an address before purchasing.');
            return;
          }

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
        }

        const updatedListing = await getListingById(paymentDetails.listingId);
        setListing(updatedListing);

        toast.success('Payment processed successfully!');
      } catch (error) {
        console.error('Failed to process payment:', error);
        toast.error('Failed to update listing after payment.');
      } finally {
        resetFlow();
      }
    },
    [paymentDetails, user, resetFlow, setLatestBid, setListing]
  );

  return {
    handleBidClick,
    handleBuyNowClick,
    handlePaymentSuccess,
  };
};
