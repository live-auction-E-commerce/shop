import { useState, useEffect } from 'react';
import useListings from '@/hooks/listings/useListings';
import { ListingGrid } from '@/components/listing/ListingGrid';
import PaymentModal from '@/components/modals/PaymentModal';
import useListingPaymentHandler from '@/hooks/payments/useListingPaymentHandler';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';

const BuyNowPage = () => {
  const { listings, isLoading } = useListings();
  const [localListings, setLocalListings] = useState([]);

  useEffect(() => {
    if (listings.length) {
      const filtered = listings.filter((listing) => listing.saleType === 'now');
      setLocalListings(filtered);
    }
  }, [listings]);

  useListingsSocket(localListings, setLocalListings);

  const {
    isPaymentModalOpen,
    pendingBidAmount,
    activeListingId,
    handleBuyNowClick,
    handlePaymentSuccess,
    handlePaymentCancel,
  } = useListingPaymentHandler(localListings);

  return (
    <>
      <ListingGrid
        listings={localListings}
        onBuyNowClick={handleBuyNowClick}
        onBidClick={() => {}}
        title="Buy Now"
        variant="compact"
        isLoading={isLoading}
      />

      {pendingBidAmount && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          amount={pendingBidAmount}
          listingId={activeListingId}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          onClose={handlePaymentCancel}
        />
      )}
    </>
  );
};

export default BuyNowPage;
