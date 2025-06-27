import { useEffect, useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';
import useBidsForListing from '@/hooks/bids/useBidsForListing';
import useSingleBidSocket from '@/hooks/sockets/useSingleBidSocket';
import { useBidContext } from '@/context/BidContext';
import BidItem from '@/components/bid/BidItem';

const BidChatbox = ({ listingId, className = '' }) => {
  const { bids: initialBids, isLoading, error } = useBidsForListing(listingId);
  const [bids, setBids] = useState([]);
  const { latestBid } = useBidContext();

  useEffect(() => {
    if (initialBids && initialBids.length > 0) {
      setBids(initialBids);
    }
  }, [initialBids]);

  useSingleBidSocket(listingId, (bid) => {
    setBids((prev) => {
      if (prev.find((b) => b._id === bid._id)) {
        return prev;
      }
      return [bid, ...prev];
    });
  });

  useEffect(() => {
    if (!latestBid || latestBid.listingId !== listingId) return;
    setBids((prev) => {
      if (prev.find((b) => b._id === latestBid._id)) return prev;
      return [latestBid, ...prev];
    });
  }, [listingId, latestBid]);

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Bid History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Bid History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <p>{error.message || 'Failed to load bids'}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Bid History
          <Badge variant="secondary" className="ml-auto">
            {bids.length} {bids.length === 1 ? 'bid' : 'bids'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80 px-6 pb-6">
          {bids.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No bids yet. Be the first to bid!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bids.map((bid, index) => (
                <BidItem key={bid._id || `bid-${index}`} bid={bid} isHighest={index === 0} />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default memo(BidChatbox);
