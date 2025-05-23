import { ListingCard, ListingCardSkeleton } from '@/components/listing/ListingCard';
import { cn } from '@/lib/utils';

const GridBody = ({
  isLoading,
  sortedListings,
  gridClass,
  gridClassName,
  onBidClick,
  onBuyNowClick,
  emptyMessage,
  itemsPerRow,
}) => {
  const loadingItems = Array(itemsPerRow.lg).fill(null);

  if (isLoading) {
    return (
      <div className={cn('grid gap-4', gridClass, gridClassName)}>
        {loadingItems.map((_, index) => (
          <ListingCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (sortedListings.length > 0) {
    return (
      <div className={cn('grid gap-4', gridClass, gridClassName)}>
        {sortedListings.map((listing) => (
          <ListingCard
            key={listing._id}
            listing={listing}
            onBidClick={onBidClick}
            onBuyNowClick={onBuyNowClick}
          />
        ))}
      </div>
    );
  }

  return <div className="py-12 text-center text-muted-foreground">{emptyMessage}</div>;
};

export default GridBody;
