import { useState, useEffect, useMemo } from 'react';
import { getAllListings } from '@/services/listingService';
const useListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getAllListings();
        setListings(data);
      } catch (err) {
        console.error('Failed to fetch listings:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  return {
    listings: useMemo(() => listings, [listings]),
    setListings,
    isLoading,
    error,
  };
};

export default useListings;
