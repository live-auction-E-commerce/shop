import { useEffect, useState } from 'react';
import ListingCarrousel from '@/components/ui/listing-carrousel';
import { ListingGrid } from '@/components/ui/listing-grid';
import { fetchAPI } from '@/lib/fetch';
import { HeroSection } from '@/components/ui/hero-section';

const Home = () => {
  const [listings, setListings] = useState([]);

  const handleClicks = () => {
    console.log('Handling a click...');
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await fetchAPI('http://localhost:5001/api/listings');
        setListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);
  return (
    <section className="flex flex-col gap-8  py-6">
      <HeroSection />
      {/* <ListingCarrousel
        title="Hot Now!"
        listings={listings}
        onBidClick={handleClicks}
        onBuyNowClick={handleClicks}
      />
      <ListingCarrousel
        title="Trending Auctions"
        listings={listings}
        onBidClick={handleClicks}
        onBuyNowClick={handleClicks}
      />
      <ListingCarrousel
        title="Ending Soon"
        listings={listings}
        onBidClick={handleClicks}
        onBuyNowClick={handleClicks}
      /> */}
      <ListingGrid
        listings={listings}
        onBidClick={handleClicks}
        onBuyNowClick={handleClicks}
        variant="compact"
      />
    </section>
  );
};

export default Home;
