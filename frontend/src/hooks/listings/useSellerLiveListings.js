import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getAllLiveListingsBySeller } from '@/services/listingService';
import { filterListings, sortListings } from '@/lib/utils';

const useSellerLiveListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [saleType, setSaleType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        if (user?._id) {
          const fetchedListings = await getAllLiveListingsBySeller(user._id);
          setListings(fetchedListings);
        }
      } catch (err) {
        console.error('Failed to fetch listings:', err);
        setError('Could not fetch listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user]);

  const filteredAndSortedListings = useMemo(() => {
    const filtered = filterListings(listings, {
      searchTerm,
      saleType,
      status: 'all',
      condition: 'all',
    });
    return sortListings(filtered, sortBy);
  }, [listings, saleType, searchTerm, sortBy]);

  const listingStats = useMemo(() => {
    const totalListings = filteredAndSortedListings.length;
    const totalValue = filteredAndSortedListings.reduce((sum, l) => {
      return sum + (l.price ?? l.startingBid ?? 0);
    }, 0);
    const averageValue = totalListings > 0 ? totalValue / totalListings : 0;

    return {
      totalListings,
      totalValue,
      averageValue,
    };
  }, [filteredAndSortedListings]);

  return {
    listings: filteredAndSortedListings,
    searchTerm,
    setSearchTerm,
    setSaleType,
    sortBy,
    setSortBy,
    listingStats,
    loading,
    error,
  };
};

export default useSellerLiveListings;
