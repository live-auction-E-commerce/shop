import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/ui/ProductDetails';
import { getListingById } from '@/services/listingService';
import { placeBid } from '@/services/bidService';
import { emitNewBid } from '@/lib/socketEvents';
import useSingleListingSocket from '@/hooks/useSingleListingSocket';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import PaymentModal from '@/components/modals/PaymentModal';

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bid, setBid] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingBidAmount, setPendingBidAmount] = useState(null);

  const { user, isAuthenticated } = useAuth();

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

  const openPaymentModal = (bidAmount) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to place a bid!');
      return;
    }
    if (bidAmount <= listing.currentBid.amount) {
      toast.error('Bid amount must be greater than the current bid');
      return;
    }
    setPendingBidAmount(bidAmount);
    setIsPaymentModalOpen(true);
  };

  // This function will be called from inside PaymentForm after successful payment
  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const newBid = await placeBid({
        listingId: id,
        userId: user._id,
        paymentIntentId,
        amount: pendingBidAmount,
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
      toast.success('Bid placed successfully!');
      setIsPaymentModalOpen(false);
      setPendingBidAmount(null);
    } catch (err) {
      console.error('Failed to place bid:', err);
      toast.error(err.message || 'Bid failed.');
    }
  };

  const handlePaymentCancel = () => {
    setIsPaymentModalOpen(false);
    setPendingBidAmount(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>Product not found</p>;

  return (
    <>
      <ProductDetails listing={listing} bid={bid} onBidClick={openPaymentModal} />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentCancel}
        amount={pendingBidAmount || 0}
        description={`Bid for ${listing._id}`}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default ListingPage;
