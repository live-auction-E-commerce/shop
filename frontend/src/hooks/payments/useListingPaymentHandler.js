import { useState, useEffect, useMemo, useCallback } from 'react';
import usePaymentHandler from '@/hooks/payments/usePaymentHandler';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes/routes_consts';
import { useNavigate } from 'react-router-dom';

const useListingPaymentHandler = (initialListings = []) => {
  const { user, defaultAddress } = useAuth();
  const navigate = useNavigate();

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

  const handleBidClick = useCallback(
    (listingId) => {
      if (!user) {
        toast.error('You must be logged in to place a bid!');
        navigate(ROUTES.LOGIN);
        return;
      }
      const listing = listings.find((l) => l._id === listingId);
      if (user._id === listing.sellerId) {
        toast.error('You can not bid on a listing you posted');
        return;
      }
      if (user._id === listing.currentBid?.userId) {
        toast.error('You own the highest bid already');
        return;
      }
      if (!defaultAddress) {
        toast.error('You must have a default address to place a bid');
        return;
      }

      if (listing) {
        setSelectedListing(listing);
        setIsBidModalOpen(true);
      }
    },
    [user, listings, defaultAddress, navigate]
  );

  const handleBidConfirm = useCallback(
    (bidAmount) => {
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
    },
    [openPaymentModal, selectedListing]
  );

  const handleBuyNowClick = useCallback(
    (listingId) => {
      if (!user?._id) {
        toast.error('You must be logged in to buy now!');
        return;
      }

      const listing = listings.find((l) => l._id === listingId);
      if (!listing) {
        toast.error('Listing not found.');
        return;
      }

      if (user._id === listing.sellerId) {
        toast.error('You can’t buy your own listing.');
        return;
      }

      if (listing) {
        setSelectedListing(listing);
      }

      openPaymentModal({
        listingId: listing._id,
        amount: listing.price,
        mode: 'buyNow',
        onSuccess: (purchasedListing) => {
          setListings((prev) => prev.filter((l) => l._id !== purchasedListing._id));
        },
      });
    },
    [listings, openPaymentModal, user?._id]
  );

  const closeBidModal = useCallback(() => setIsBidModalOpen(false), []);

  return useMemo(
    () => ({
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
    }),
    [
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
    ]
  );
};

export default useListingPaymentHandler;
