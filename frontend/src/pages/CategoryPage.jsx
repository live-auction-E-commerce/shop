import { useParams } from 'react-router-dom';
import { ListingGrid } from '@/components/listing/ListingGrid';
import useListings from '@/hooks/useListings';

const CategoryPage = () => {
  const handleClick = () => {
    console.log('Click handeling....');
  };
  const { categoryName } = useParams();
  const { listings } = useListings();
  const filteredListings = listings.filter(
    (listing) => listing.product?.category?.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <ListingGrid
      listings={filteredListings}
      title={categoryName}
      onBuyNowClick={handleClick}
      onBidClick={handleClick}
      variant="compact"
      className="mt-2 "
    />
  );
};

export default CategoryPage;
