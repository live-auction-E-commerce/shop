import { useEffect, useState } from 'react';
import HeroSection from '@/components/ui/hero-section';
import ListingCarrousel from '@/components/listing/ListingCarrousel';
import BidModal from '@/components/modals/BidModal';
import PaymentModal from '@/components/modals/PaymentModal';
import useListings from '@/hooks/listings/useListings';
import useListingPaymentHandler from '@/hooks/payments/useListingPaymentHandler';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';

const Home = () => {
  const { listings: initialListings, isLoading } = useListings();
  const [localListings, setLocalListings] = useState([]);

  useEffect(() => {
    if (initialListings.length) {
      setLocalListings(initialListings);
    }
  }, [initialListings]);

  useListingsSocket(localListings, setLocalListings);

  const {
    listings,
    isBidModalOpen,
    selectedListing,
    handleBidClick,
    handleBuyNowClick,
    handleBidConfirm,
    handlePaymentSuccess,
    handlePaymentCancel,
    isPaymentModalOpen,
    pendingBidAmount,
    activeListingId,
    closeBidModal,
  } = useListingPaymentHandler(localListings);

  return (
    <section className="flex flex-col">
      <HeroSection />

      <ListingCarrousel
        title="Hot Now!"
        listings={listings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
        isPaused={isBidModalOpen || isPaymentModalOpen}
      />
      <ListingCarrousel
        title="Trending Auctions"
        listings={listings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
        isPaused={isBidModalOpen || isPaymentModalOpen}
      />
      <ListingCarrousel
        title="Ending Soon"
        listings={listings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
        isPaused={isBidModalOpen || isPaymentModalOpen}
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
    </section>
  );
};

export default Home;
