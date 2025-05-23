import { useState } from 'react';
import ListingCard from '@/components/listing/ListingCard';
import ListingCardSkeleton from '@/components/listing/ListingCardSkeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { cn, getGridClass } from '@/lib/utils';

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
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Generate loading skeletons based on screen size
  const loadingItems = Array(itemsPerRow.lg).fill(null);

  // Filter and sort listings
  const filteredListings = listings.filter((listing) => {
    const product = listing.product;
    if (!product) return false;
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower) ||
      product.category?.toLowerCase().includes(searchLower) ||
      product.brand?.toLowerCase().includes(searchLower)
    );
  });

  // Sort listings
  // Consider to export sorting functionality in each case to a function.
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'oldest':
        // Here you could use the newest functionality.
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      case 'price-high':
        return (
          (b.price || b.currentBid?.amount || b.startingBid || 0) -
          (a.price || a.currentBid?.amount || a.startingBid || 0)
        );
      case 'price-low':
        // Here you could use the price-high functionality.
        return (
          (a.price || a.currentBid?.amount || a.startingBid || 0) -
          (b.price || b.currentBid?.amount || b.startingBid || 0)
        );
      case 'ending-soon':
        return (
          new Date(a.expiredAt || Number.POSITIVE_INFINITY) -
          new Date(b.expiredAt || Number.POSITIVE_INFINITY)
        );
      default:
        return 0;
    }
  });

  const gridClass = getGridClass(itemsPerRow);
  // Very long component. Separate to smaller components
  return (
    <Card className={cn('w-full mt-2', className)}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle>{title}</CardTitle>

        {showFilters && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {/* Filter panel - can be expanded with more filter options */}
        {showFilters && showFilterPanel && (
          <div className="mb-4 p-4 border rounded-md">
            <h3 className="font-medium mb-2">Filters</h3>
            {/* Additional filters can be added here */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sale Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="auction">Auction</SelectItem>
                    <SelectItem value="buy-now">Buy Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {/* Categories would be dynamically populated */}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className={cn('grid gap-4', gridClass, gridClassName)}>
            {loadingItems.map((_, index) => (
              <ListingCardSkeleton key={index} />
            ))}
          </div>
        ) : sortedListings.length > 0 ? (
          <div className={cn('grid gap-4', gridClass, gridClassName)}>
            {sortedListings.map((listing) => {
              return (
                <ListingCard
                  key={listing._id}
                  listing={listing}
                  onBidClick={onBidClick}
                  onBuyNowClick={onBuyNowClick}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground">{emptyMessage}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ListingGrid;
