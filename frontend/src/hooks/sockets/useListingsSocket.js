import { useEffect } from 'react';
import {
  emitJoinListing,
  emitLeaveListing,
  listenToNewBid,
  removeSocketListeners,
  listenToPurchase,
} from '@/lib/socketEvents';

const useListingsSocket = (listings, setListings) => {
  // Join/leave rooms when listings change
  useEffect(() => {
    if (!listings?.length) return;

    listings.forEach((listing) => {
      emitJoinListing(listing._id);
    });

    return () => {
      listings.forEach((listing) => {
        emitLeaveListing(listing._id);
      });
    };
  }, [listings]);

  // Listen for new bids (once, when mounted)
  useEffect(() => {
    const handleNewBid = ({ listingId, bid }) => {
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === listingId
            ? {
                ...listing,
                currentBid: {
                  amount: bid.amount,
                  userId: bid.userId,
                },
              }
            : listing
        )
      );
    };
    const handlePurchase = ({ listingId }) => {
      setListings((prevListings) => prevListings.filter((listing) => listing._id !== listingId));
    };
    listenToPurchase(handlePurchase);
    listenToNewBid(handleNewBid);

    return () => {
      // Only remove the listeners here
      removeSocketListeners();
    };
  }, [setListings]);
};

export default useListingsSocket;
