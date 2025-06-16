import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListingGrid } from '@/components/listing/ListingGrid';
import useListings from '@/hooks/listings/useListings';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';
import useListingPaymentHandler from '@/hooks/payments/useListingPaymentHandler';
import BidModal from '@/components/modals/BidModal';
import PaymentModal from '@/components/modals/PaymentModal';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { listings: allListings, isLoading } = useListings();
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    if (allListings.length) {
      const filtered = allListings.filter(
        (listing) => listing.product?.category?.toLowerCase() === categoryName.toLowerCase()
      );
      setFilteredListings(filtered);
    }
  }, [allListings, categoryName]);

  useListingsSocket(filteredListings, setFilteredListings);

  const {
    listings,
    isPaymentModalOpen,
    pendingBidAmount,
    activeListingId,
    selectedListing,
    isBidModalOpen,
    handleBidClick,
    handleBuyNowClick,
    handleBidConfirm,
    handlePaymentSuccess,
    handlePaymentCancel,
    closeBidModal,
  } = useListingPaymentHandler(filteredListings);

  return (
    <>
      <ListingGrid
        listings={listings}
        title={categoryName}
        onBuyNowClick={handleBuyNowClick}
        onBidClick={handleBidClick}
        isLoading={isLoading}
      />

      {selectedListing && (
        <BidModal
          isOpen={isBidModalOpen}
          onClose={closeBidModal}
          currentBidAmount={selectedListing.currentBid?.amount || selectedListing.startingBid || 0}
          onConfirm={handleBidConfirm}
        />
      )}

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

export default CategoryPage;
