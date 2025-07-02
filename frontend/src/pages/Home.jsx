import { useEffect, useState, useMemo } from 'react';
import HeroSection from '@/components/ui/hero-section';
import ListingCarrousel from '@/components/listing/ListingCarrousel';
import BidModal from '@/components/modals/BidModal';
import PaymentModal from '@/components/modals/PaymentModal';
import AddressSelectionModal from '@/components/modals/AddressSelectionModal';
import useListings from '@/hooks/listings/useListings';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';
import { usePaymentFlow, PAYMENT_STEPS } from '@/hooks/payments/usePaymentFlow';
import { useListingActionHandlers } from '@/hooks/payments/useListingActionHandlers';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Home = () => {
  const { listings: initialListings, isLoading } = useListings();

  const [listings, setListings] = useState(initialListings);
  useListingsSocket(listings, setListings);

  // sync initialListings and listings
  useEffect(() => {
    if (initialListings.length > 0 && listings.length === 0) {
      setListings(initialListings);
    }
  }, [initialListings]);

  const {
    currentStep,
    paymentDetails,
    startPaymentFlow,
    handleBidConfirm,
    handleAddressSelection,
    resetFlow,
  } = usePaymentFlow(false);

  const { handleBidClick, handleBuyNowClick, handlePaymentSuccess } = useListingActionHandlers({
    setListings,
    startPaymentFlow,
    resetFlow,
    paymentDetails,
  });

  const selectedListing = useMemo(
    () => listings.find((l) => l._id === paymentDetails.listingId),
    [listings, paymentDetails.listingId]
  );

  const isBidModalOpen = currentStep === PAYMENT_STEPS.AMOUNT_ENTRY;
  const isPaymentModalOpen = currentStep === PAYMENT_STEPS.PAYMENT;
  const isAddressSelectionModalOpen = currentStep === PAYMENT_STEPS.ADDRESS_SELECTION;

  return (
    <section className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <HeroSection />
      </motion.div>

      <ListingCarrousel
        title="Hot Now!"
        listings={listings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
        isPaused={
          currentStep === PAYMENT_STEPS.PAYMENT || currentStep === PAYMENT_STEPS.AMOUNT_ENTRY
        }
      />

      <ListingCarrousel
        title="Trending Auctions"
        listings={listings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
        isPaused={
          currentStep === PAYMENT_STEPS.PAYMENT || currentStep === PAYMENT_STEPS.AMOUNT_ENTRY
        }
      />

      <ListingCarrousel
        title="Ending Soon"
        listings={listings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        isLoading={isLoading}
        isPaused={
          currentStep === PAYMENT_STEPS.PAYMENT || currentStep === PAYMENT_STEPS.AMOUNT_ENTRY
        }
      />

      {isBidModalOpen && (
        <BidModal
          isOpen={true}
          onClose={resetFlow}
          currentBidAmount={paymentDetails?.amount}
          onConfirm={handleBidConfirm}
        />
      )}

      {isAddressSelectionModalOpen && (
        <AddressSelectionModal
          isOpen={true}
          onConfirm={handleAddressSelection}
          onClose={resetFlow}
        />
      )}

      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={true}
          amount={paymentDetails.amount}
          listing={selectedListing}
          addressId={paymentDetails.addressId}
          onSuccess={handlePaymentSuccess}
          onClose={resetFlow}
        />
      )}
    </section>
  );
};

export default Home;
