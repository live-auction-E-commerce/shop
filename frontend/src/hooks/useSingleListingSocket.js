import { useEffect } from 'react';
import {
  emitJoinListing,
  emitLeaveListing,
  listenToNewBid,
  removeSocketListeners,
} from '@/lib/socketEvents';

// Remove comments
// Custom hook to handle socket setup for a single listing:
// - Joins the socket room for the listing
// - Listens for new bid events from other users
// - Updates the listing state with the latest bid to trigger UI re-render


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

    listenToNewBid(handleNewBid);
    return () => {
      removeSocketListeners();
    };
  }, [listing, setListing]);
};

export default useSingleListingSocket;
