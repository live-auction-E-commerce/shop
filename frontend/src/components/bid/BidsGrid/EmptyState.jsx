import { Package, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyState = ({ hasSearchOrFilters, onClearFilters }) => {
  if (hasSearchOrFilters) {
    return (
      <div className="text-center py-12">
        <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Matching Bids</h2>
        <p className="text-muted-foreground mb-6">
          No bids match your current search criteria. Try adjusting your filters or search terms.
        </p>
        <Button onClick={onClearFilters} variant="outline">
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Bids Yet</h2>
      <p className="text-muted-foreground mb-6">
        You haven't placed any bids yet. Start exploring auctions to place your first bid!
      </p>
      <Button>Browse Auctions</Button>
    </div>
  );
};

export default EmptyState;
