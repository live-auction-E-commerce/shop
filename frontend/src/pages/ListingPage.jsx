import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/ui/ProductDetails';
import { fetchAPI } from '@/lib/fetch';
import useSocketEmit from '@/hooks/useSocketEmit';
import useSocketListener from '@/hooks/useSocketListener';

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const emit = useSocketEmit();

  // Fetch listing and emit join event
  useEffect(() => {
    async function fetchListing() {
      setLoading(true);
      try {
        const data = await fetchAPI(`/api/listings/${id}`);
        emit('join-listing', id); // Emit join room
        setListing(data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchListing();
  }, [id, emit]);

   const handleBidClick = (bidAmount) => {
    emit('new-bid', {
      listingId: id,
      bid: {
        userId: '65f1eeb2a4c9e1d123456789',
        amount: bidAmount,
        createdAt: new Date().toISOString(),
      },
    });
  };


  useSocketListener('socket-joined-your-room', ({ message, userId }) => {
    console.log('User joined the room:', userId, message);
  });

  useSocketListener('new-bid', ({ listingId: incomingId, bid }) => {
    if (incomingId === id) {
      console.log(`Another user placed a bid: $${bid.amount}`, bid);
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>Product not found</p>;

  return <ProductDetails listing={listing} onBidClick={handleBidClick} />;
};

export default ListingPage;
