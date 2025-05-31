import React, { useEffect, useState } from 'react';
import ListingCarrousel from '@/components/listing/ListingCarrousel';
import useListings from '@/hooks/useListings';
import HeroSection from '@/components/ui/hero-section';
import useListingsSocket from '@/hooks/useListingsSocket';
import BidModal from '@/components/modals/BidModal';
import PaymentModal from '@/components/modals/PaymentModal';
import usePaymentHandler from '@/hooks/usePaymentHandler';

const Home = () => {
  const { listings, isLoading } = useListings();
  const [localListings, setLocalListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

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
    const listing = localListings.find((l) => l._id === listingId);
    if (listing) {
      setSelectedListing(listing);
      setIsBidModalOpen(true);
    }
  };

  const handleBuyNowClick = (listingId) => {
    console.log('Buy Now clicked for:', listingId);
    // Trigger Buy Now payment logic here
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
        />
      )}
    </section>
  );
};

export default Home;
