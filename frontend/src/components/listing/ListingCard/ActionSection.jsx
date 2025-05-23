import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, ShoppingCart, Clock } from 'lucide-react';

const ActionSection = ({
  isAuction,
  isExpired,
  isSold,
  listing,
  onBidClick,
  onBuyNowClick,
  progressPercentage,
  timeRemaining,
  status,
}) => {
  if (status !== 'active') return null;

  return (
    <div className="mt-auto space-y-2 text-xs">
      {isAuction ? (
        <>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {listing.currentBid ? 'Current bid' : 'Starting bid'}
            </span>
            <span className="font-medium">
              ${(listing.currentBid?.amount || listing.startingBid || 0).toFixed(2)}
            </span>
          </div>

          {progressPercentage > 0 && <Progress value={progressPercentage} className="h-1" />}

          {timeRemaining && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-2.5 w-2.5" />
              <span>{timeRemaining}</span>
            </div>
          )}

          <Button
            size="sm"
            className="w-full h-7 text-xs cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onBidClick?.(listing._id);
            }}
            disabled={isExpired || isSold}
          >
            <ArrowUp className="h-3 w-3 mr-1" />
            Bid
          </Button>
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Price</span>
            <span className="font-medium">${(listing.price || 0).toFixed(2)}</span>
          </div>

          <Button
            size="sm"
            className="w-full h-7 text-xs cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onBuyNowClick?.(listing._id);
            }}
            disabled={isSold}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Buy
          </Button>
        </>
      )}
    </div>
  );
};

export default ActionSection;
