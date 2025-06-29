import { Badge } from '@/components/ui/badge';

const ResultSummary = ({ totalResults, hasActiveFilters, searchQuery, filters }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {totalResults} {totalResults === 1 ? 'bid' : 'bids'} found
      </p>

      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filters:</span>
          <div className="flex gap-1 flex-wrap">
            {searchQuery && (
              <Badge variant="secondary" className="text-xs">
                Search: {searchQuery}
              </Badge>
            )}
            {filters.status !== 'all' && (
              <Badge variant="secondary" className="text-xs">
                Status: {filters.status}
              </Badge>
            )}
            {filters.category !== 'all' && (
              <Badge variant="secondary" className="text-xs">
                Category: {filters.category}
              </Badge>
            )}
            {filters.condition !== 'all' && (
              <Badge variant="secondary" className="text-xs">
                Condition: {filters.condition}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultSummary;
