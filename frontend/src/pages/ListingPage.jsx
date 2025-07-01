import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/ui/ProductDetails';
import BidChatbox from '@/components/bid/BidChatbox';
import WinnerModal from '@/components/modals/WinnerModal';
import { getListingById } from '@/services/listingService';
import useSingleListingSocket from '@/hooks/sockets/useSingleListingSocket';
import PaymentModal from '@/components/modals/PaymentModal';
import HighestBidderIndicator from '@/components/bid/HighestBidderIndicator';
import { useAuth } from '@/context/AuthContext';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { usePaymentFlow, PAYMENT_STEPS } from '@/hooks/payments/usePaymentFlow';
import AddressSelectionModal from '@/components/modals/AddressSelectionModal';
import { useListingActionHandlers } from '@/hooks/payments/useListingActionHandlers';

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  console.log(listing);

  const { width, height } = useWindowSize();
  const { user } = useAuth();

  const { currentStep, paymentDetails, startPaymentFlow, handleAddressSelection, resetFlow } =
    usePaymentFlow(listing, true);

  const { handleBidClick, handleBuyNowClick, handlePaymentSuccess } = useListingActionHandlers({
    listing,
    setListing,
    startPaymentFlow,
    resetFlow,
    paymentDetails,
  });
  const isUserHighestBidder = listing?.currentBid?.userId === user?._id;

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

  const { winnerData, clearWinnerData } = useSingleListingSocket(
    listing,
    setListing,
    setShowConfetti
  );

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
        <HighestBidderIndicator isVisible={isUserHighestBidder} />
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

        {currentStep === PAYMENT_STEPS.ADDRESS_SELECTION && (
          <AddressSelectionModal
            isOpen={true}
            onConfirm={handleAddressSelection}
            onClose={resetFlow}
          />
        )}

        {currentStep === PAYMENT_STEPS.PAYMENT && (
          <PaymentModal
            isOpen={true}
            amount={paymentDetails.amount}
            listing={listing}
            addressId={paymentDetails.addressId}
            onSuccess={handlePaymentSuccess}
            onClose={resetFlow}
          />
        )}

        <WinnerModal
          isVisible={!!winnerData}
          winnerEmail={winnerData?.buyerEmail}
          onClose={clearWinnerData}
        />
      </div>
    </>
  );
};

export default ListingPage;
