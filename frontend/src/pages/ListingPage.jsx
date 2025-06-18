import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/ui/ProductDetails';
import BidChatbox from '@/components/bid/BidChatbox';
import { getListingById } from '@/services/listingService';
import useSingleListingSocket from '@/hooks/sockets/useSingleListingSocket';
import { toast } from 'sonner';
import PaymentModal from '@/components/modals/PaymentModal';
import usePaymentHandler from '@/hooks/payments/usePaymentHandler';
import { useAuth } from '@/context/AuthContext';
import { maxPossibleBidAmount } from '@/constants/constants';
import { useBidContext } from '@/context/BidContext';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize();
  const { user } = useAuth();
  const { setLatestBid } = useBidContext();

  const {
    openPaymentModal,
    handlePaymentSuccess,
    handlePaymentCancel,
    isPaymentModalOpen,
    pendingBidAmount,
  } = usePaymentHandler();

  useEffect(() => {
    if (showConfetti) {
      const timeout = setTimeout(() => setShowConfetti(false), 10000);
      return () => clearTimeout(timeout);
    }
  }, [showConfetti]);

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

  useSingleListingSocket(listing, setListing, setShowConfetti);

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
        setLatestBid(newBid);
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
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500} // More confetti
          gravity={0.3} // Slower fall for a fun effect
          wind={0.01} // Slight drift
          recycle={false} // Stop after one explosion
          initialVelocityX={10}
          initialVelocityY={15}
          tweenDuration={7000} // Smoother, longer animation
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={listing.saleType === 'auction' ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <ProductDetails
              listing={listing}
              onBidClick={handleBidClick}
              onBuyNowClick={handleBuyNowClick}
            />
          </div>

          {listing.saleType === 'auction' && (
            <div className="lg:col-span-1">
              <BidChatbox listingId={id} className="sticky top-4" />
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
    </>
  );
};

export default ListingPage;
