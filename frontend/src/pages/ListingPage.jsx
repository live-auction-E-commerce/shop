import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/ui/ProductDetails';
import { getListingById } from '@/services/listingService';
import useSingleListingSocket from '@/hooks/sockets/useSingleListingSocket';
import { toast } from 'sonner';
import PaymentModal from '@/components/modals/PaymentModal';
import usePaymentHandler from '@/hooks/payments/usePaymentHandler';
import { useAuth } from '@/context/AuthContext';

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bid, setBid] = useState(null);
  const { user } = useAuth();

  const {
    openPaymentModal,
    handlePaymentSuccess,
    handlePaymentCancel,
    isPaymentModalOpen,
    pendingBidAmount,
  } = usePaymentHandler();

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

  const handleBidClick = (bidAmount) => {
    if (!user?._id) {
      toast.error('You must be logged in to place a bid!');
      return;
    }
    const currentBidAmount = listing.currentBid?.amount || listing.startingBid;
    if (bidAmount <= currentBidAmount) {
      toast.error('Bid must be greater than current bid');
      return;
    }

    openPaymentModal({
      listingId: id,
      amount: bidAmount,
      onSuccess: (newBid) => {
        setBid(newBid);
        setListing((prev) => ({
          ...prev,
          currentBid: {
            _id: newBid._id,
            amount: newBid.amount,
            userId: newBid.userId,
          },
        }));
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>Product not found</p>;

  return (
    <>
      <ProductDetails listing={listing} bid={bid} onBidClick={handleBidClick} />

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
