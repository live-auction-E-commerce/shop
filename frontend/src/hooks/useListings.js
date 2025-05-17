import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/fetch';

const useListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await fetchAPI('/listings');
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

  return { listings, isLoading, error };
};

export default useListings;
