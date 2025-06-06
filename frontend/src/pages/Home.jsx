import { useEffect, useState } from 'react';
import ListingCarrousel from '@/components/listing/ListingCarrousel';
import useListings from '@/hooks/listings/useListings';
import HeroSection from '@/components/ui/hero-section';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';
import BidModal from '@/components/modals/BidModal';
import PaymentModal from '@/components/modals/PaymentModal';
import usePaymentHandler from '@/hooks/payments/usePaymentHandler';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Home = () => {
  const { listings, isLoading } = useListings();
  const [localListings, setLocalListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const { user } = useAuth();

  const {
    openPaymentModal,
    handlePaymentSuccess,
    handlePaymentCancel,
    isPaymentModalOpen,
    pendingBidAmount,
    activeListingId,
  } = usePaymentHandler();

  useEffect(() => {
    if (listings.length) {
      setLocalListings(listings);
    }
  }, [listings]);

  useListingsSocket(localListings, setLocalListings);

  const handleBidClick = (listingId) => {
    if (!user?._id) {
      toast.error('You must be logged in to place a bid!');
      return;
    }
    const listing = localListings.find((l) => l._id === listingId);
    if (listing) {
      setSelectedListing(listing);
      setIsBidModalOpen(true);
    }
  };

  // TODO : Handle Buy Now Logic
  const handleBuyNowClick = (listingId) => {
    console.log('Buy Now clicked for:', listingId);
  };

  const handleBidAmountConfirmed = (bidAmount) => {
    setIsBidModalOpen(false);
    if (selectedListing) {
      openPaymentModal({
        listingId: selectedListing._id,
        amount: bidAmount,
        onSuccess: (newBid) => {
          setLocalListings((prevListings) =>
            prevListings.map((listing) =>
              listing._id === newBid.listingId
                ? {
                    ...listing,
                    currentBid: {
                      _id: newBid._id,
                      amount: newBid.amount,
                      userId: newBid.userId,
                    },
                  }
                : listing
            )
          );

          setSelectedListing((prev) => ({
            ...prev,
            currentBid: {
              _id: newBid._id,
              amount: newBid.amount,
              userId: newBid.userId,
            },
          }));
        },
      });
    }
  };

  return (
    <section className="flex flex-col">
      <HeroSection />

      <ListingCarrousel
        title="Hot Now!"
        listings={localListings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
        isPaused={isBidModalOpen || isPaymentModalOpen}
      />
      <ListingCarrousel
        title="Trending Auctions"
        listings={localListings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
        isPaused={isBidModalOpen || isPaymentModalOpen}
      />
      <ListingCarrousel
        title="Ending Soon"
        listings={localListings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
        isPaused={isBidModalOpen || isPaymentModalOpen}
      />

      {selectedListing && (
        <BidModal
          isOpen={isBidModalOpen}
          onClose={() => setIsBidModalOpen(false)}
          currentBidAmount={selectedListing.currentBid?.amount || selectedListing.startingBid || 0}
          onConfirm={handleBidAmountConfirmed}
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
