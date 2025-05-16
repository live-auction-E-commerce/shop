import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ListingCardSkeleton({ variant = 'default' }) {
  const isCompact = variant === 'compact';

  return (
    <Card className={`flex flex-col h-full overflow-hidden ${isCompact ? 'text-sm' : ''}`}>
      <div className="aspect-square">
        <Skeleton className="h-full w-full" />
      </div>
      <div className={`p-${isCompact ? '3' : '4'} space-y-${isCompact ? '2' : '3'}`}>
        <Skeleton className={`h-${isCompact ? '4' : '6'} w-3/4`} />

        {!isCompact && variant === 'default' && (
          <>
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
          </>
        )}

        {isCompact && (
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        )}

        <div className="flex justify-between">
          <Skeleton className={`h-${isCompact ? '3' : '4'} w-1/3`} />
          <Skeleton className={`h-${isCompact ? '3' : '4'} w-1/4`} />
        </div>

        <Skeleton className="h-1 w-full" />
        <Skeleton className={`h-${isCompact ? '3' : '4'} w-1/2`} />

        {(variant === 'default' || isCompact) && (
          <Skeleton className={`h-${isCompact ? '7' : '10'} w-full mt-2`} />
        )}
      </div>
    </Card>
  );
}
