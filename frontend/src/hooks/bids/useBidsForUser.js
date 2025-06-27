import { useState, useEffect } from 'react';
import { getUserBids } from '@/services/bidService';

const useBidsForUser = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserBids = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUserBids();
      setBids(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bids');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBids();
  }, []);

  return {
    bids,
    loading,
    error,
    refetch: fetchUserBids,
  };
};

export default useBidsForUser;
