import { ListingCard } from './components/ui/listing-card';
import {
  buyNowListing,
  auctionListing,
  soldListing,
  currentBid,
  sampleProduct,
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
      <h1 className="text-2xl font-bold mb-6">Marketplace Listings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Auction listing with current bid */}
        <ListingCard listing={auctionListing} product={sampleProduct} onBidClick={handleBidClick} />

        {/* Buy now listing */}
        <ListingCard
          listing={buyNowListing}
          product={sampleProduct}
          onBuyNowClick={handleBuyNowClick}
        />

        {/* Sold listing */}
        <ListingCard listing={soldListing} product={sampleProduct} />

        {/* Loading state */}
        <ListingCard listing={soldListing} product={sampleProduct} isLoading={true} />
      </div>
    </main>
  );
}

export default App;
