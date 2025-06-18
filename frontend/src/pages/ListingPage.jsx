import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/ui/ProductDetails';
import BidChatbox from '@/components/ui/BidChatbox';
import { getListingById } from '@/services/listingService';
import useSingleListingSocket from '@/hooks/sockets/useSingleListingSocket';
import { toast } from 'sonner';
import PaymentModal from '@/components/modals/PaymentModal';
import usePaymentHandler from '@/hooks/payments/usePaymentHandler';
import { useAuth } from '@/context/AuthContext';
import { maxPossibleBidAmount } from '@/constants/constants';

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localNewBid, setLocalNewBid] = useState(null);
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
    if (!user?.id) {
      toast.error('You must be logged in to place a bid!');
      return;
    }
    const currentBidAmount = listing.currentBid?.amount || listing.startingBid;
    if (bidAmount <= currentBidAmount) {
      toast.error('Bid must be greater than current bid');
      return;
    }
    if (bidAmount >= maxPossibleBidAmount) {
      toast.error(`Maximum bid is: $${maxPossibleBidAmount}`);
      return;
    }
    if (user.id === listing.sellerId) {
      toast.error('You can not bid on a listing you posted');
      return;
    }
    if (user.id === listing.currentBid?.userId) {
      toast.error('You own the highest bid already');
      return;
    }

    openPaymentModal({
      listingId: id,
      amount: bidAmount,
      onSuccess: (newBid) => {
        setListing((prev) => ({
          ...prev,
          currentBid: {
            _id: newBid._id,
            amount: newBid.amount,
            userId: newBid.userId,
          },
        }));
        setLocalNewBid(newBid);
      },
    });
  };

  const handleBuyNowClick = () => {
    if (!user?.id) {
      toast.error('You must be logged in to buy now!');
      return;
    }
    if (user.id === listing.sellerId) {
      toast.error('You can not buy a listing you posted');
      return;
    }
    openPaymentModal({
      listingId: id,
      amount: listing.price,
      onSuccess: () => {
        setListing((prev) => ({
          ...prev,
          isSold: true,
        }));
      },
      mode: 'buyNow',
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>Product not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Adjust column span depending on sale type */}
        <div className={listing.saleType === 'auction' ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <ProductDetails
            listing={listing}
            onBidClick={handleBidClick}
            onBuyNowClick={handleBuyNowClick}
          />
        </div>

        {/* Only show bid chatbox if it's an auction */}
        {listing.saleType === 'auction' && (
          <div className="lg:col-span-1">
            <BidChatbox listingId={id} className="sticky top-4" localNewBid={localNewBid} />
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentCancel}
        amount={pendingBidAmount || 0}
        description={`Bid for ${listing._id}`}
        onSuccess={handlePaymentSuccess}
        listing={listing}
      />
    </div>
  );
};

export default ListingPage;
