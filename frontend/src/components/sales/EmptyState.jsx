import { Card, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';

const EmptyState = ({ hasSearchTerm }) => (
  <Card>
    <CardContent className="flex flex-col items-center justify-center py-12">
      <Package className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No Sales found</h3>
      <p className="text-muted-foreground text-center">
        {hasSearchTerm ? 'Try adjusting your search' : "You haven't placed any orders yet"}
      </p>
    </CardContent>
  </Card>
);

export default EmptyState;
