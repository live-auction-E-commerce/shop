import { useEffect, useState, useMemo } from 'react';
import useListings from '@/hooks/listings/useListings';
import { ListingGrid } from '@/components/listing/ListingGrid';
import BidModal from '@/components/modals/BidModal';
import PaymentModal from '@/components/modals/PaymentModal';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';
import { usePaymentFlow, PAYMENT_STEPS } from '@/hooks/payments/usePaymentFlow';
import { useListingActionHandlers } from '@/hooks/payments/useListingActionHandlers';
import AddressSelectionModal from '@/components/modals/AddressSelectionModal';
import { useListingValidations } from '@/hooks/listings/useListingValidations';

const LiveAuctions = () => {
  const { listings: allListings, isLoading } = useListings();
  const [filteredListings, setfilteredListings] = useState([]);

  useEffect(() => {
    const auctionItems = allListings.filter((l) => l.saleType === 'auction');
    setfilteredListings(auctionItems);
  }, [allListings]);

  useListingsSocket(filteredListings, setfilteredListings);

  const {
    currentStep,
    paymentDetails,
    startPaymentFlow,
    handleAddressSelection,
    handleBidConfirm,
    resetFlow,
  } = usePaymentFlow(false);

  const { handleBuyNowClick, handleBidClick, handlePaymentSuccess } = useListingActionHandlers({
    setListings: setfilteredListings,
    startPaymentFlow,
    resetFlow,
    paymentDetails,
  });

  const selectedListing = useMemo(
    () => filteredListings.find((l) => l._id === paymentDetails.listingId),
    [filteredListings, paymentDetails.listingId]
  );

  const { validateBidAmount } = useListingValidations();

  const isBidModalOpen = currentStep === PAYMENT_STEPS.AMOUNT_ENTRY;
  const isPaymentModalOpen = currentStep === PAYMENT_STEPS.PAYMENT;

  return (
    <>
      <ListingGrid
        listings={filteredListings}
        onBidClick={handleBidClick}
        onBuyNowClick={handleBuyNowClick}
        title="Live Auctions"
        variant="compact"
        isLoading={isLoading}
      />

      {isBidModalOpen && (
        <BidModal
          isOpen={isBidModalOpen}
          currentBidAmount={paymentDetails?.amount || 0}
          onClose={resetFlow}
          onConfirm={(amount) => {
            const listing = filteredListings.find((l) => l._id === paymentDetails.listingId);
            try {
              if (!validateBidAmount(listing, amount)) {
                return;
              }
              handleBidConfirm(amount);
            } catch (err) {}
          }}
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
          listingId={paymentDetails.listingId}
          listing={selectedListing}
          onSuccess={handlePaymentSuccess}
          onClose={resetFlow}
        />
      )}
    </>
  );
};

export default LiveAuctions;
