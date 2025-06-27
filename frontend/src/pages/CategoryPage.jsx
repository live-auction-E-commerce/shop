import { useEffect, useState } from 'react';
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
  const [selectedListing, setSelectedListing] = useState(null);

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
    setListing: setSelectedListing,
    setListings: setFilteredListings,
    startPaymentFlow,
    resetFlow,
    paymentDetails,
  });

  const isBidModalOpen = currentStep === PAYMENT_STEPS.AMOUNT_ENTRY;
  const isPaymentModalOpen = currentStep === PAYMENT_STEPS.PAYMENT;

  return (
    <>
      <ListingGrid
        listings={filteredListings}
        title={categoryName}
        onBuyNowClick={handleBuyNowClick}
        onBidClick={handleBidClick}
        isLoading={isLoading}
      />

      {selectedListing && isBidModalOpen && (
        <BidModal
          isOpen={isBidModalOpen}
          onClose={resetFlow}
          currentBidAmount={
            selectedListing?.currentBid?.amount || selectedListing?.startingBid || 0
          }
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
          listingId={paymentDetails.listingId}
          listing={filteredListings.find((l) => l._id === paymentDetails.listingId)}
          onSuccess={handlePaymentSuccess}
          onClose={resetFlow}
        />
      )}
    </>
  );
};

export default CategoryPage;
