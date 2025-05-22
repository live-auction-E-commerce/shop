import React, { useEffect, useState } from 'react';
import ListingCarrousel from '@/components/listing/ListingCarrousel';
import useListings from '@/hooks/useListings';
import HeroSection from '@/components/ui/hero-section';
import useListingsSocket from '@/hooks/useListingsSocket';

const Home = () => {
  const { listings, isLoading } = useListings();
  const [localListings, setLocalListings] = useState([]);

  // Sync local copy of listings
  useEffect(() => {
    if (listings.length) {
      setLocalListings(listings);
    }
  }, [listings]);

  useListingsSocket(localListings, setLocalListings);

  const handleBidClick = (listingId) => {
    console.log('Bid clicked for:', listingId);
  };

  const handleBuyNowClick = (listingId) => {
    console.log('Buy Now clicked for:', listingId);
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
      />
      <ListingCarrousel
        title="Trending Auctions"
        listings={localListings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
      />
      <ListingCarrousel
        title="Ending Soon"
        listings={localListings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Home;
