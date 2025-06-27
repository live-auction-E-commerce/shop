import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const FiltersPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  filterOptions,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Status Filter */}
      <Select value={filters.status} onValueChange={(value) => onFilterChange('status', value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="sold">Sold</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectContent>
      </Select>

      {/* Category Filter */}
      <Select value={filters.category} onValueChange={(value) => onFilterChange('category', value)}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {filterOptions.categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Condition Filter */}
      <Select
        value={filters.condition}
        onValueChange={(value) => onFilterChange('condition', value)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Conditions</SelectItem>
          {filterOptions.conditions.map((condition) => (
            <SelectItem key={condition} value={condition}>
              {condition.charAt(0).toUpperCase() + condition.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort Options */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <SlidersHorizontal className="h-4 w-4" />
            Sort
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48" align="start">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Sort by</label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => onFilterChange('sortBy', value)}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Bid Amount</SelectItem>
                  <SelectItem value="expiry">Auction End</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Order</label>
              <Select
                value={filters.sortOrder}
                onValueChange={(value) => onFilterChange('sortOrder', value)}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="gap-2">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default FiltersPanel;
