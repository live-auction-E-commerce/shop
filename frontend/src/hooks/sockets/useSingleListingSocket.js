import { useEffect } from 'react';
import {
  emitJoinListing,
  emitLeaveListing,
  listenToNewBid,
  removeSocketListeners,
  listenToAuctionEnd,
  listenToPurchase,
} from '@/lib/socketEvents';
import { toast } from 'sonner';

const useSingleListingSocket = (listing, setListing) => {
  useEffect(() => {
    if (!listing?._id) return;

    emitJoinListing(listing._id);

    return () => {
      emitLeaveListing(listing._id);
      removeSocketListeners();
    };
  }, [listing]);

  useEffect(() => {
    const handleNewBid = ({ listingId, bid }) => {
      if (listingId === listing?._id) {
        setListing((prev) =>
          prev
            ? {
                ...prev,
                currentBid: {
                  amount: bid.amount,
                  userId: bid.userId,
                },
              }
            : prev
        );
      }
    };
    const handlePurchase = ({ listingId }) => {
      if (listing?._id === listingId) {
        setListing((prev) => ({
          ...prev,
          isSold: true,
        }));
        toast.success('This listing was purchased');
      }
    };
    listenToPurchase(handlePurchase);
    listenToNewBid(handleNewBid);
    listenToAuctionEnd(({ message, winner }) => {
      if (listing?._id === winner.listingId) {
        setListing((prev) => ({
          ...prev,
          isSold: true,
        }));
        alert(message);
      }
    });
    return () => {
      removeSocketListeners();
    };
  }, [listing, setListing]);
};

export default useSingleListingSocket;
