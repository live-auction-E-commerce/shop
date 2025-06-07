import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListingGrid } from '@/components/listing/ListingGrid';
import useListings from '@/hooks/listings/useListings';
import useListingsSocket from '@/hooks/sockets/useListingsSocket';
import usePaymentHandler from '@/hooks/payments/usePaymentHandler';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import BidModal from '@/components/modals/BidModal';
import PaymentModal from '@/components/modals/PaymentModal';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { user } = useAuth();
  const { listings, isLoading } = useListings();
  const [localListings, setLocalListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  useEffect(() => {
    if (listings.length) {
      const filtered = listings.filter(
        (listing) => listing.product?.category?.toLowerCase() === categoryName.toLowerCase()
      );
      setLocalListings(filtered);
    }
  }, [listings, categoryName]);

  const {
    openPaymentModal,
    handlePaymentSuccess,
    handlePaymentCancel,
    isPaymentModalOpen,
    pendingBidAmount,
    activeListingId,
  } = usePaymentHandler();

  useListingsSocket(localListings, setLocalListings);

  const handleBidClick = (listingId) => {
    if (!user?._id) {
      toast.error('You must be logged in to place a bid!');
      return;
    }
    const listing = listings.find((l) => l._id === listingId);
    if (listing) {
      setSelectedListing(listing);
      setIsBidModalOpen(true);
    }
  };
  // TODO : Impelement buy now logic
  const handleBuyNowClick = (listingId) => {
    console.log('Buy Now clicked for:', listingId);
  };

  const handleBidAmountConfirmed = (bidAmount) => {
    setIsBidModalOpen(false);
    if (selectedListing) {
      openPaymentModal({
        listingId: selectedListing._id,
        amount: bidAmount,
        onSuccess: (newBid) => {
          setLocalListings((prevListings) =>
            prevListings.map((listing) =>
              listing._id === newBid.listingId
                ? {
                    ...listing,
                    currentBid: {
                      _id: newBid._id,
                      amount: newBid.amount,
                      userId: newBid.userId,
                    },
                  }
                : listing
            )
          );

          setSelectedListing((prev) => ({
            ...prev,
            currentBid: {
              _id: newBid._id,
              amount: newBid.amount,
              userId: newBid.userId,
            },
          }));
        },
      });
    }
  };

  return (
    <>
      <ListingGrid
        listings={localListings}
        title={categoryName}
        onBuyNowClick={handleBuyNowClick}
        onBidClick={handleBidClick}
        isLoading={isLoading}
      />

      {selectedListing && (
        <BidModal
          isOpen={isBidModalOpen}
          onClose={() => setIsBidModalOpen(false)}
          currentBidAmount={selectedListing.currentBid?.amount || selectedListing.startingBid || 0}
          onConfirm={handleBidAmountConfirmed}
        />
      )}

      {pendingBidAmount && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          amount={pendingBidAmount}
          listingId={activeListingId}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          onClose={handlePaymentCancel}
        />
      )}
    </>
  );
};

export default CategoryPage;
