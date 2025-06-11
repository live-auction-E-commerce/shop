import { useState, useEffect } from 'react';
import usePaymentHandler from '@/hooks/payments/usePaymentHandler';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const useListingPaymentHandler = (initialListings = []) => {
  const { user } = useAuth();

  const {
    isPaymentModalOpen,
    pendingBidAmount,
    activeListingId,
    openPaymentModal,
    handlePaymentSuccess,
    handlePaymentCancel,
  } = usePaymentHandler();

  const [listings, setListings] = useState(initialListings);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  // This is to support both array and single listing formats
  useEffect(() => {
    if (Array.isArray(initialListings)) {
      setListings(initialListings);
    } else if (initialListings?._id) {
      setListings([initialListings]);
    }
  }, [initialListings]);

  const handleBidClick = (listingId) => {
    if (!user?._id) {
      toast.error('You must be logged in to place a bid!');
      return;
    }
    const listing = listings.find((l) => l._id === listingId);
    if (user._id === listing.sellerId) {
      toast.error('You can not bid on a listing you posted');
      return;
    }
    if (user._id === listing.currentBid?.userId) {
      toast.error('You own the highest bid allready');
      return;
    }
    if (listing) {
      setSelectedListing(listing);
      setIsBidModalOpen(true);
    }
  };

  const handleBidConfirm = (bidAmount) => {
    setIsBidModalOpen(false);
    if (!selectedListing) return;

    openPaymentModal({
      listingId: selectedListing._id,
      amount: bidAmount,
      onSuccess: (newBid) => {
        setListings((prev) =>
          prev.map((l) => (l._id === newBid.listingId ? { ...l, currentBid: newBid } : l))
        );
        setSelectedListing(null);
      },
    });
  };

  // TODO : Implement Buy Now Logic
  const handleBuyNowClick = (listingId) => {
    if (!user?._id) {
      toast.error('You must be logged in to buy now!');
      return;
    }
    console.log('Buy Now clicked for:', listingId);
  };

  const closeBidModal = () => setIsBidModalOpen(false);

  return {
    listings,
    isBidModalOpen,
    selectedListing,
    isPaymentModalOpen,
    pendingBidAmount,
    activeListingId,
    handleBidClick,
    handleBidConfirm,
    handleBuyNowClick,
    handlePaymentSuccess,
    handlePaymentCancel,
    closeBidModal,
  };
};

export default useListingPaymentHandler;
