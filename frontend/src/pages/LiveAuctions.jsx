import useListings from '@/hooks/useListings';
import ListingGrid from '@/components/listing/ListingGrid';

const LiveAuctions = () => {
  const { listings, isLoading } = useListings();
  const filteredListings = listings.filter((listing) => listing.saleType === 'auction');

  const handleClick = () => {
    console.log('Handles click...');
  };

  return (
    <ListingGrid
      listings={filteredListings}
      onBuyNowClick={handleClick}
      onBidClick={handleClick}
      title="Live Auctions"
      variant="compact"
      isLoading={isLoading}
    />
  );
};

export default LiveAuctions;
