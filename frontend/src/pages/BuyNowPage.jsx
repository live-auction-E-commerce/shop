import { useEffect, useState } from 'react';
import useListings from '@/hooks/listings/useListings';
import { ListingGrid } from '@/components/listing/ListingGrid';
import PaymentModal from '@/components/modals/PaymentModal';
import useListingPaymentHandler from '@/hooks/payments/useListingPaymentHandler';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';

const BuyNowPage = () => {
  const { listings: allListings, isLoading } = useListings();
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    if (allListings.length) {
      const filtered = allListings.filter((l) => l.saleType === 'now');
      setFilteredListings(filtered);
    }
  }, [allListings]);

  useListingsSocket(filteredListings, setFilteredListings);

  const {
    listings,
    isPaymentModalOpen,
    pendingBidAmount,
    activeListingId,
    handleBuyNowClick,
    handlePaymentSuccess,
    handlePaymentCancel,
  } = useListingPaymentHandler(filteredListings);

  return (
    <>
      <ListingGrid
        listings={listings}
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
