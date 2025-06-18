import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { formatTimeAgo, maskEmail } from '@/lib/bidHelpers';

const BidItem = ({ bid, isHighest }) => {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border ${
        isHighest ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'
      }`}
    >
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
            isHighest ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
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
          {isHighest && (
            <Badge variant="default" className="text-xs">
              Highest
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="text-lg font-bold text-green-600">{formatCurrency(bid.amount)}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatTimeAgo(bid.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidItem;
