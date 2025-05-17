import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ListingCardSkeleton = () => {
  return (
    <Card className="flex flex-col h-full overflow-hidden text-sm">
      <div className="aspect-square">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />

        <div className="flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>

        <Skeleton className="h-1 w-full" />
        <Skeleton className="h-3 w-1/2" />

        <Skeleton className="h-7 w-full mt-2" />
      </div>
    </Card>
  );
};

export default ListingCardSkeleton;
