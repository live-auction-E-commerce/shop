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

   const handleBidClick = async (bidAmount) => {
  try {
    const fakeUserId = '682c6aa24d11b67f3842ee33'; // Replace with real auth later
    const fakePaymentIntentId = '664b4914c1234567890abce0'; // Also placeholder

    const newBid = await fetchAPI(`/api/bids`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    listingId: id,
    userId: fakeUserId,
    paymentIntentId: fakePaymentIntentId,
    amount: bidAmount,
  }),
});

    

    // Broadcast bid to others via socket
    emit('new-bid', {
      listingId: id,
      bid: {
        userId: newBid.userId,
        amount: newBid.amount,
        createdAt: newBid.createdAt,
      },
    });

    // Update UI immediately
    setListing((prev) => ({
      ...prev,
      currentBid: {
        _id: newBid._id,
        amount: newBid.amount,
        userId: newBid.userId,
      },
    }));
  } catch (err) {
    console.error('Failed to place bid:', err);
    alert(err.message || 'Bid failed.');
  }
};


  useSocketListener('socket-joined-your-room', ({ message, userId }) => {
    console.log('User joined the room:', userId, message);
  });

  useSocketListener('new-bid', ({ listingId: incomingId, bid }) => {
  if (incomingId === id) {
    console.log('bid accepted',bid);
    setListing((prev) => ({
      ...prev,
      currentBid: {
        amount: bid.amount,
        userId: bid.userId,
      },
    }));
  }
});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>Product not found</p>;

  return <ProductDetails listing={listing} onBidClick={handleBidClick} />;
};

export default ListingPage;
