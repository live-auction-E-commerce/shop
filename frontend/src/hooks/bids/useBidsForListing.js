import { useState, useEffect } from 'react';
import { getAllBidsByListing } from '@/services/bidService';

const useBidsForListing = (listingId) => {
  const [bids, setBids] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!listingId) {
      setIsLoading(false);
      setError(new Error('Listing ID is required'));
      return;
    }

    const fetchBids = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllBidsByListing(listingId);
        setBids(data);
      } catch (err) {
        console.error('Failed to fetch bids:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBids();
  }, [listingId]);

  return { bids, isLoading, error };
};

export default useBidsForListing;
