import { Badge } from '@/components/ui/badge';

const StatusBadges = ({ status, isAuction }) => (
  <>
    <div className="absolute top-2 right-2">
      <Badge
        variant={status === 'expired' ? 'destructive' : status === 'sold' ? 'secondary' : 'default'}
        className="text-xs px-1.5 py-0"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    </div>
    <div className="absolute top-2 left-2">
      <Badge variant="secondary" className="backdrop-blur-sm text-xs px-1.5 py-0">
        {isAuction ? 'Auction' : 'Buy Now'}
      </Badge>
    </div>
  </>
);

export default StatusBadges;
