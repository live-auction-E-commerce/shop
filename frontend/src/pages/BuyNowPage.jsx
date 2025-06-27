import { useEffect, useState, useMemo } from 'react';
import useListings from '@/hooks/listings/useListings';
import { ListingGrid } from '@/components/listing/ListingGrid';
import PaymentModal from '@/components/modals/PaymentModal';
import AddressSelectionModal from '@/components/modals/AddressSelectionModal';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';
import { usePaymentFlow, PAYMENT_STEPS } from '@/hooks/payments/usePaymentFlow';
import { useListingActionHandlers } from '@/hooks/payments/useListingActionHandlers';

const BuyNowPage = () => {
  const { listings: allListings, isLoading } = useListings();
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    if (allListings.length) {
      const filtered = allListings.filter((l) => l.saleType === 'now');
      setFilteredListings(filtered);
    }
  }, [allListings]);

  useListingsSocket(filteredListings, setFilteredListings);

  const {
    currentStep,
    paymentDetails,
    startPaymentFlow,
    handleAddressSelection,
    handleBidConfirm,
    resetFlow,
  } = usePaymentFlow(false);

  const { handleBuyNowClick, handleBidClick, handlePaymentSuccess } = useListingActionHandlers({
    setListings: setFilteredListings,
    startPaymentFlow,
    resetFlow,
    paymentDetails,
  });

  const selectedListing = useMemo(
    () => filteredListings.find((l) => l._id === paymentDetails.listingId),
    [filteredListings, paymentDetails.listingId]
  );

  const isBidModalOpen = currentStep === PAYMENT_STEPS.AMOUNT_ENTRY;
  const isPaymentModalOpen = currentStep === PAYMENT_STEPS.PAYMENT;
  return (
    <>
      <ListingGrid
        listings={filteredListings}
        onBuyNowClick={handleBuyNowClick}
        onBidClick={handleBidClick}
        title="Buy Now"
        variant="compact"
        isLoading={isLoading}
      />

      {isBidModalOpen && (
        <BidModal
          isOpen={isBidModalOpen}
          currentBidAmount={paymentDetails?.amount}
          onClose={resetFlow}
          onConfirm={handleBidConfirm}
        />
      )}

      {currentStep === PAYMENT_STEPS.ADDRESS_SELECTION && (
        <AddressSelectionModal
          isOpen={true}
          onConfirm={handleAddressSelection}
          onClose={resetFlow}
        />
      )}

      {paymentDetails && isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          amount={paymentDetails.amount}
          listing={selectedListing}
          onSuccess={handlePaymentSuccess}
          onClose={resetFlow}
        />
      )}
    </>
  );
};

export default BuyNowPage;
