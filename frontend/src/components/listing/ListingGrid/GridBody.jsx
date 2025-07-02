import { ListingCard, ListingCardSkeleton } from '@/components/listing/ListingCard';
import { cn } from '@/lib/utils';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

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
        {sortedListings.map((listing, i) => (
          <motion.div
            key={listing._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
          >
            <ListingCard
              key={listing._id}
              listing={listing}
              onBidClick={onBidClick}
              onBuyNowClick={onBuyNowClick}
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return <div className="py-12 text-center text-muted-foreground">{emptyMessage}</div>;
};

export default GridBody;
