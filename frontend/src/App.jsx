import { ListingCard } from './components/ui/listing-card';
import { ListingGrid } from './components/ui/listing-grid';
import {
  buyNowListing,
  auctionListing,
  soldListing,
  sampleProduct,
  sampleListings,
  sampleProducts,
} from './constants/constants';

const handleBidClick = (listingId) => {
  console.log(`Placing bid on listing: ${listingId}`);
};

const handleBuyNowClick = (listingId) => {
  console.log(`Buying item from listing: ${listingId}`);
};

function App() {
  return (
    <main className="container mx-auto p-4">
      <ListingGrid
        listings={sampleListings}
        products={sampleProducts}
        title="Featured Listings"
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        itemsPerRow={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      />
    </main>
  );
}

export default App;
