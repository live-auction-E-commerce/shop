import useListings from '@/hooks/useListings';
import ListingGrid from '@/components/listing/ListingGrid';

const BuyNowPage = () => {
  const { listings, isLoading } = useListings();
  const filteredListings = listings.filter((listing) => listing.saleType === 'now');

  const handleClick = () => {
    console.log('Handles click...');
  };

  return (
    <ListingGrid
      listings={filteredListings}
      onBuyNowClick={handleClick}
      onBidClick={handleClick}
      title="Buy Now"
      variant="compact"
      isLoading={isLoading}
    />
  );
};

export default BuyNowPage;
