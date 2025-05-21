import React, { useEffect, useState } from 'react';
import ListingCarrousel from '@/components/listing/ListingCarrousel';
import useListings from '@/hooks/useListings';
import HeroSection from '@/components/ui/hero-section';

import {
  emitJoinListing,
  emitLeaveListing,
  listenToNewBid,
  removeSocketListeners,
} from '@/lib/socketEvents';

const Home = () => {
  const { listings: initialListings, isLoading } = useListings();
  const [listings, setListings] = useState([]);

  // Set local listings and join socket rooms for each listing
  useEffect(() => {
    if (initialListings.length) {
      setListings(initialListings);

      // Join socket rooms for all listings
      initialListings.forEach((listing) => {
        emitJoinListing(listing._id);
      });

      // Cleanup on unmount or listings change: leave rooms and remove listeners
      return () => {
        initialListings.forEach((listing) => {
          emitLeaveListing(listing._id);
        });
        removeSocketListeners();
      };
    }
  }, [initialListings]);

  // Listen to new bid socket events and update matching listing in state
  useEffect(() => {
    const handleNewBid = ({ listingId, bid }) => {
      setListings((prevListings) => {
        let updated = false;
        const updatedListings = prevListings.map((listing) => {
          if (listing._id === listingId) {
            updated = true;
            return {
              ...listing,
              currentBid: {
                amount: bid.amount,
                userId: bid.userId,
              },
            };
          }
          return listing;
        });

        return updated ? updatedListings : prevListings;
      });
    };

    listenToNewBid(handleNewBid);

    return () => {
      removeSocketListeners();
    };
  }, []);

  const handleClicks = () => {
    console.log('Handling a click...');
  };

  return (
    <section className="flex flex-col">
      <HeroSection />
      <ListingCarrousel
        title="Hot Now!"
        listings={listings}
        onBidClick={handleClicks}
        onBuyNowClick={handleClicks}
        isLoading={isLoading}
      />
      <ListingCarrousel
        title="Trending Auctions"
        listings={listings}
        onBidClick={handleClicks}
        onBuyNowClick={handleClicks}
        isLoading={isLoading}
      />
      <ListingCarrousel
        title="Ending Soon"
        listings={listings}
        onBidClick={handleClicks}
        onBuyNowClick={handleClicks}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Home;
