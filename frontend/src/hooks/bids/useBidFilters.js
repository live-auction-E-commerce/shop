import { useState, useMemo, useCallback } from 'react';
import { getAuctionStatus } from '@/lib/utils';

const useBidFilters = (bids) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });
  const filteredAndSortedBids = useMemo(() => {
    const filtered = bids.filter((bid) => {
      // Search filter
      const matchesSearch =
        bid.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bid.product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bid.product.brand.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Status filter
      if (filters.status !== 'all') {
        const status = getAuctionStatus(bid.listing).status;
        if (status !== filters.status) return false;
      }

      if (filters.category !== 'all' && bid.product.category !== filters.category) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      console.log(a);

      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.bid.createdAt).getTime() - new Date(b.bid.createdAt).getTime();
          break;
        case 'amount':
          comparison = a.bid.amount - b.bid.amount;
          break;
        case 'expiry':
          comparison =
            new Date(a.listing.expiredAt).getTime() - new Date(b.listing.expiredAt).getTime();
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [bids, searchQuery, filters]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({
      status: 'all',
      category: 'all',
      sortBy: 'date',
      sortOrder: 'desc',
    });
  }, []);

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const categories = [...new Set(bids.map((bid) => bid.product.category))];
    return {
      categories,
    };
  }, [bids]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    filteredAndSortedBids,
    filterOptions,
    hasActiveFilters:
      searchQuery !== '' ||
      Object.values(filters).some(
        (value) => value !== 'all' && value !== 'date' && value !== 'desc'
      ),
  };
};

export default useBidFilters;
