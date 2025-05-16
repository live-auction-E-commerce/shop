import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/fetch';

const useListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return { listings, loading, error };
};

export default useListings;
