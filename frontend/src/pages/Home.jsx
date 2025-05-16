import ListingCarrousel from '@/components/listing/ListingCarrousel';
import useListings from '@/hooks/useListings';
import { HeroSection } from '@/components/ui/hero-section';

const Home = () => {
  const handleClicks = () => {
    console.log('Handling a click...');
  };

  const { listings } = useListings();

  return (
    <section className="flex flex-col">
      <HeroSection />
      <ListingCarrousel
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
      />
    </section>
  );
};

export default Home;
