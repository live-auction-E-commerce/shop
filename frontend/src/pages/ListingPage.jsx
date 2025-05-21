import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/ui/ProductDetails';
import { fetchAPI } from '@/lib/fetch';
import {
  emitJoinListing,
  emitNewBid,
  listenToJoinRoom,
  listenToNewBid,
  removeSocketListeners
} from '@/lib/socketEvents';

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bid, setBid] = useState(null);

  useEffect(() => {
    async function fetchListing() {
      setLoading(true);
      try {
        const data = await fetchAPI(`/api/listings/${id}`);
        emitJoinListing(id); // socket emit moved
        setListing(data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchListing();
  }, [id]);

  useEffect(() => {
    // Listen to socket events
    const handleJoinRoom = ({ message, userId }) => {
      console.log('User joined the room:', userId, message);
    };

    const handleNewBid = ({ listingId: incomingId, bid }) => {
      if (incomingId === id) {
        console.log('bid accepted', bid);
        setListing((prev) => ({
          ...prev,
          currentBid: {
            amount: bid.amount,
            userId: bid.userId,
          },
        }));
      }
    };
      listenToJoinRoom(handleJoinRoom);
      listenToNewBid(handleNewBid);
      return () => {
      // Clean up
      removeSocketListeners();
    };
  }, [id]);
  const handleBidClick = async (bidAmount) => {
    try {
      const fakeUserId = '682c6aa24d11b67f3842ee33';
      const fakePaymentIntentId = '664b4914c1234567890abce0';

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

      setBid(newBid);
      emitNewBid(id, newBid); // emit moved to socketEvents

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>Product not found</p>;

  return <ProductDetails listing={listing} bid={bid} onBidClick={handleBidClick} />;
};

export default ListingPage;
