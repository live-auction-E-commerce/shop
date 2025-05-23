import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ListingCardSkeleton = () => {
  return (
    <Card className="flex flex-col h-full overflow-hidden text-sm">
      {/* Product Image Placeholder */}
      <div className="aspect-square" id="image-skeleton">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="p-3 space-y-2" id="details-skeleton">
        {/* Product Name Placeholder */}
        <Skeleton className="h-4 w-3/4" id="title-skeleton" />

        {/* Price and Brand placeholders */}
        <div className="flex justify-between" id="price-brand-skeleton">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Category and Status placeholders */}
        <div className="flex justify-between" id="category-status-skeleton">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>

        {/* Divider line */}
        <Skeleton className="h-1 w-full" id="divider-skeleton" />

        {/* Additional info placeholder */}
        <Skeleton className="h-3 w-1/2" id="info-skeleton" />

        {/* Action button placeholder */}
        <Skeleton className="h-7 w-full mt-2" id="button-skeleton" />
      </div>
    </Card>
  );
};

export default ListingCardSkeleton;
