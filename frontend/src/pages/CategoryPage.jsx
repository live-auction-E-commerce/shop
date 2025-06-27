import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ListingGrid } from '@/components/listing/ListingGrid';
import useListings from '@/hooks/listings/useListings';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';
import { useListingHandlers } from '@/hooks/listings/useListingHandlers';
import { usePaymentFlow, PAYMENT_STEPS } from '@/hooks/payments/usePaymentFlow';
import BidModal from '@/components/modals/BidModal';
import PaymentModal from '@/components/modals/PaymentModal';
import AddressSelectionModal from '@/components/modals/AddressSelectionModal';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { listings: allListings, isLoading } = useListings();
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    if (allListings.length) {
      const filtered = allListings.filter(
        (listing) => listing.product?.category?.toLowerCase() === categoryName.toLowerCase()
      );
      setFilteredListings(filtered);
    }
  }, [allListings, categoryName]);

  useListingsSocket(filteredListings, setFilteredListings);

  const {
    currentStep,
    paymentDetails,
    startPaymentFlow,
    handleAddressSelection,
    handleBidConfirm,
    resetFlow,
  } = usePaymentFlow(false);

  const { handleBuyNowClick, handleBidClick, handlePaymentSuccess } = useListingHandlers({
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
  const isAddressSelectionModalOpen = currentStep === PAYMENT_STEPS.ADDRESS_SELECTION;

  return (
    <>
      <ListingGrid
        listings={filteredListings}
        title={categoryName}
        onBuyNowClick={handleBuyNowClick}
        onBidClick={handleBidClick}
        isLoading={isLoading}
      />

      {isBidModalOpen && (
        <BidModal
          isOpen={isBidModalOpen}
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

export default CategoryPage;
