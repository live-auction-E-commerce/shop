import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/ui/ProductDetails';
import { getListingById } from '@/services/listingService';
import { placeBid } from '@/services/bidService';
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
        const data = await getListingById(id);
        setListing(data);
      } catch (err) {
        setError(`Failed to load product. : ${err}`);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchListing();
  }, [id]);

  useSingleListingSocket(listing, setListing);

  const handleBidClick = async (bidAmount) => {
    try {
      const fakeUserId = '682c6aa24d11b67f3842ee33'; // TODO: Send the current user ID which do this from context
      const fakePaymentIntentId = '664b4914c1234567890abce0'; // TODO: Create PaymentIntent with Stripe

      const newBid = await placeBid({
        listingId: id,
        userId: fakeUserId,
        paymentIntentId: fakePaymentIntentId,
        amount: bidAmount,
      });

      setBid(newBid);
      emitNewBid(id, newBid);
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
