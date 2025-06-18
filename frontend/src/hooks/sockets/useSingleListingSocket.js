import { useEffect } from 'react';
import {
  emitJoinListing,
  emitLeaveListing,
  listenToNewBid,
  removeSocketListeners,
  listenToAuctionEnd,
} from '@/lib/socketEvents';

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
