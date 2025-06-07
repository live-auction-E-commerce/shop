import { useEffect, useState } from 'react';
import useListings from '@/hooks/listings/useListings';
import { ListingGrid } from '@/components/listing/ListingGrid';
import useListingPaymentHandler from '@/hooks/payments/useListingPaymentHandler';
import BidModal from '@/components/modals/BidModal';
import PaymentModal from '@/components/modals/PaymentModal';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';

const LiveAuctions = () => {
  const { listings: allListings, isLoading } = useListings();
  const [localListings, setLocalListings] = useState([]);

  useEffect(() => {
    const auctionItems = allListings.filter((l) => l.saleType === 'auction');
    setLocalListings(auctionItems);
  }, [allListings]);

  useListingsSocket(localListings, setLocalListings);

  const {
    listings,
    isBidModalOpen,
    selectedListing,
    isPaymentModalOpen,
    pendingBidAmount,
    activeListingId,
    handleBidClick,
    handleBidConfirm,
    handleBuyNowClick,
    handlePaymentSuccess,
    handlePaymentCancel,
    closeBidModal,
  } = useListingPaymentHandler(localListings, setLocalListings);

  return (
    <>
      <ListingGrid
        listings={listings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        title="Live Auctions"
        variant="compact"
        isLoading={isLoading}
      />

      {selectedListing && (
        <BidModal
          isOpen={isBidModalOpen}
          currentBidAmount={selectedListing.currentBid?.amount || 0}
          onClose={closeBidModal}
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

export default LiveAuctions;
