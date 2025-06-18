import { useEffect, useRef } from 'react';
import {
  emitJoinListing,
  emitLeaveListing,
  listenToNewBid,
  listenToAuctionEnd,
  listenToPurchase,
  removeSocketListeners,
} from '@/lib/socketEvents';
import { toast } from 'sonner';

const useSingleListingSocket = (listing, setListing, setShowConfetti) => {
  const listingIdRef = useRef(null);

  useEffect(() => {
    if (!listing?._id) return;

    listingIdRef.current = listing._id;
    emitJoinListing(listing._id);

    return () => {
      emitLeaveListing(listing._id);
      removeSocketListeners();
    };
  }, [listing?._id]);

  useEffect(() => {
    const handleNewBid = ({ listingId, bid }) => {
      console.log('Received new bid via socket:', bid);
      if (listingId === listingIdRef.current) {
        setListing((prev) =>
          prev
            ? {
                ...prev,
                currentBid: {
                  _id: bid._id,
                  amount: bid.amount,
                  userId: bid.userId,
                },
              }
            : prev
        );
      }
    };

    const handlePurchase = ({ listingId }) => {
      if (listingId === listingIdRef.current) {
        setListing((prev) => ({
          ...prev,
          isSold: true,
        }));
        toast.warning('This listing was purchased');
      }
    };

    const handleAuctionEnd = ({ winner }) => {
      if (winner.listingId === listingIdRef.current) {
        setListing((prev) => ({
          ...prev,
          isSold: true,
        }));
        toast.warning(`Auction ended!`);
        setShowConfetti(true);
      }
    };

    listenToNewBid(handleNewBid);
    listenToPurchase(handlePurchase);
    listenToAuctionEnd(handleAuctionEnd);

    return () => {
      removeSocketListeners();
    };
  }, [setListing, setShowConfetti]);
};

export default useSingleListingSocket;
