import useBids from '../hooks/bids/useBidsForUser';
import useBidFilters from '../hooks/bids/useBidFilters';
import useRequireAuth from '@/hooks/auth/useRequireAuth';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/bid/BidsGrid/SearchBar';
import FiltersPanel from '../components/bid/BidsGrid/FiltersPanel';
import ResultsSummary from '../components/bid/BidsGrid/ResultsSummary';
import BidCard from '../components/bid/BidsGrid/BidCard';
import LoadingSkeleton from '../components/bid/BidsGrid/LoadingSkeleton';
import EmptyState from '../components/bid/BidsGrid/EmptyState';
import { ROUTES } from '@/routes/routes_consts';
import { useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const YourBidsPage = () => {
  const { bids, loading, error } = useBids();
  const navigate = useNavigate();
  const isAllowed = useRequireAuth();

  const {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    filteredAndSortedBids,
    filterOptions,
    hasActiveFilters,
  } = useBidFilters(bids);

  const handleViewDetails = useCallback(
    (bid) => {
      const listingId = bid.listing._id || bid.bid.listingId;
      navigate(ROUTES.LISTING_PAGE.replace(':id', listingId));
    },
    [navigate]
  );

  if (!isAllowed) {
    return null;
  }
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    throw new Error('There was an error');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Bids</h1>
        <p className="text-muted-foreground">
          Track all your auction bids and their current status
        </p>
      </div>

      {/* Search and Filters */}
      {bids.length > 0 && (
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          {/* Filters Panel */}
          <FiltersPanel
            filters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            filterOptions={filterOptions}
          />

          {/* Results Summary */}
          <ResultsSummary
            totalResults={filteredAndSortedBids.length}
            hasActiveFilters={hasActiveFilters}
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>
      )}

      {/* Bids Grid */}
      {filteredAndSortedBids.length === 0 ? (
        <EmptyState hasSearchOrFilters={hasActiveFilters} onClearFilters={clearFilters} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedBids.map((bid, index) => (
            <motion.div
              key={bid._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <BidCard key={bid._id} bid={bid.bid} onViewDetails={handleViewDetails} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourBidsPage;
