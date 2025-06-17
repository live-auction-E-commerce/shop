import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import useBids from '@/hooks/common/UseBids';

const BidChatbox = ({ listingId, className = '' }) => {
  const { bids, isLoading, error } = useBids(listingId);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    console.log(diffInSeconds);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;
    return `${username.slice(0, 2)}***@${domain}`;
  };

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

  const bidList = bids || [];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Bid History
          <Badge variant="secondary" className="ml-auto">
            {bidList.length} {bidList.length === 1 ? 'bid' : 'bids'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80 px-6 pb-6">
          {bidList.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No bids yet. Be the first to bid!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bidList.map((bid, index) => (
                <div
                  key={bid._id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    index === 0 ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        index === 0
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {bid.userId?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">
                        {bid.userId?.email ? maskEmail(bid.userId.email) : 'Anonymous'}
                      </p>
                      {index === 0 && (
                        <Badge variant="default" className="text-xs">
                          Highest
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(bid.amount)}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(bid.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BidChatbox;
