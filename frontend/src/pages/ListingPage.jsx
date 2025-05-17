import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSocketEmit from '@/hooks/useSocketEmit';

const ListingPage = () => {
  const { listingId } = useParams();
  const emit = useSocketEmit();

  useEffect(() => {
    if (!listingId) return;

    // Join room when page loads
    emit('join-listing', listingId);
    console.log(`Joined listing room ${listingId}`);

    // Leave room when component unmounts or listingId changes
    return () => {
      emit('leave-listing', listingId);
      console.log(`Left listing room ${listingId}`);
    };
  }, [listingId, emit]);

  return <div>ListingPage</div>;
};

export default ListingPage;
