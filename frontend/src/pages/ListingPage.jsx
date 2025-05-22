import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/ui/ProductDetails';
import { fetchAPI } from '@/lib/fetch';
import { emitNewBid } from '@/lib/socketEvents';
import useSingleListingSocket from '@/hooks/useSingleListingSocket';

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
        setListing(data);
      } catch (err) {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchListing();
  }, [id]);

  // Use your socket hook here, passing listing and setListing
  useSingleListingSocket(listing, setListing);

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
      emitNewBid(id, newBid); // emit new bid event

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
