import { useEffect, useState } from 'react';
import { ListingGrid } from './components/ui/listing-grid';
import {
  buyNowListing,
  auctionListing,
  sampleListings,
  sampleProducts,
} from './constants/constants';
import { fetchAPI } from './lib/fetch';

const handleBidClick = (listingId) => {
  console.log(`Placing bid on listing: ${listingId}`);
};

const handleBuyNowClick = (listingId) => {
  console.log(`Buying item from listing: ${listingId}`);
};

function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await fetchAPI('http://localhost:5000/api/listings');
        console.log(data);
        setListings(data);
      } catch (error) {
      } finally {
      }
    };
    fetchListings();
  }, []);
  return (
    <main className="container mx-auto p-4">
      <ListingGrid
        listings={listings}
        title="Featured Listings"
        variant="compact"
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        itemsPerRow={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      />
    </main>
  );
}

export default App;
