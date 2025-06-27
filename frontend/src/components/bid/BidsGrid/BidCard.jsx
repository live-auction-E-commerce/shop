import { memo } from 'react';
import { formatCurrency, getAuctionStatus, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const BidCard = ({ bid, onViewDetails }) => {
  const isWinning = (bidId, currentBidId) => {
    return bidId === currentBidId;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sold':
        return '✓';
      case 'expired':
        return '⚠';
      case 'active':
        return '⏱';
      default:
        return '⏱';
    }
  };
  const auctionStatus = getAuctionStatus(bid.listing);
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={bid.product.images[0] || '/placeholder.svg?height=200&width=200'}
            alt={bid.product.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={auctionStatus.variant} className="flex items-center gap-1">
              <span>{getStatusIcon(auctionStatus.status)}</span>
              {auctionStatus.label}
            </Badge>
          </div>
          {isWinning && auctionStatus.status === 'active' && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-green-300 hover:bg-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                <h1 className="text-black font-semibold">Leading</h1>
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{bid.product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{bid.product.description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              Your Bid
            </span>
            <span className="font-semibold text-lg">{formatCurrency(bid.amount)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Starting Bid</span>
            <span className="text-sm">{formatCurrency(bid.listing.startingBid)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Bid Placed
            </span>
            <span className="text-sm">{formatDate(bid.createdAt)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Auction Ends
            </span>
            <span className="text-sm">{formatDate(bid.listing.expiredAt)}</span>
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Brand</span>
              <span>{bid.product.brand}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Condition</span>
              <Badge variant="outline" className="text-xs">
                {bid.product.condition}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => onViewDetails?.(bid)}
          >
            View Full Listing Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(BidCard);
