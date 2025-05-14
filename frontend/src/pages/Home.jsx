import { useEffect, useState } from 'react';
import ListingCarrousel from '@/components/ui/listing-carrousel';
import { fetchAPI } from '@/lib/fetch';

const Home = () => {
  const [listings, setListings] = useState([]);

  const handleClicks = () => {
    console.log('Handling a click...');
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await fetchAPI('http://localhost:5000/api/listings');
        setListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <ListingCarrousel
          title="Hot Now!"
          listings={listings}
          onBidClick={handleClicks}
          onBuyNowClick={handleClicks}
        />
      </div>
      <div className="flex-1">
        <ListingCarrousel
          title="Trending Auctions"
          listings={listings}
          onBidClick={handleClicks}
          onBuyNowClick={handleClicks}
        />
      </div>
      <div className="flex-1">
        <ListingCarrousel
          title="Ending Soon"
          listings={listings}
          onBidClick={handleClicks}
          onBuyNowClick={handleClicks}
        />
      </div>
    </div>
  );
};

export default Home;
