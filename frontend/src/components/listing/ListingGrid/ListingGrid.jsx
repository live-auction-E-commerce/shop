import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, getGridClass, sortListings, filterListings } from '@/lib/utils';
import GridHeader from './GridHeader';
import FilterPanel from './FilterPanel';
import GridBody from './GridBody';

const ListingGrid = ({
  listings = [],
  title = '',
  isLoading = false,
  onBidClick,
  onBuyNowClick,
  className = '',
  showFilters = true,
  emptyMessage = 'Nothing found...',
  gridClassName = '',
  itemsPerRow = { sm: 1, md: 2, lg: 3, xl: 4 },
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => setFiltersVisible((prev) => !prev);

  const filteredListings = useMemo(() => {
    return filterListings(listings, searchTerm);
  }, [listings, searchTerm]);

  const sortedListings = useMemo(() => {
    return sortListings(filteredListings, sortBy);
  }, [filteredListings, sortBy]);

  const gridClass = getGridClass(itemsPerRow);

  return (
    <Card className={cn('w-full', className)}>
      {title && (
        <CardHeader>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
      )}

      <CardContent className="space-y-4">
        <GridHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          toggleFilters={toggleFilters}
        />

        {filtersVisible && showFilters && <FilterPanel />}

        <GridBody
          isLoading={isLoading}
          sortedListings={sortedListings}
          gridClass={gridClass}
          gridClassName={gridClassName}
          onBidClick={onBidClick}
          onBuyNowClick={onBuyNowClick}
          emptyMessage={emptyMessage}
          itemsPerRow={itemsPerRow}
        />
      </CardContent>
    </Card>
  );
};

export default ListingGrid;
