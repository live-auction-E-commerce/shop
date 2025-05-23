// Custom hook to manage socket connections for live updates of multiple listings.
// Joins/leaves rooms based on current listings and updates state on new bids.

import { useEffect } from 'react';
import {
  emitJoinListing,
  emitLeaveListing,
  listenToNewBid,
  removeSocketListeners,
} from '@/lib/socketEvents';

const useListingsSocket = (listings, setListings) => {
  useEffect(() => {
    if (!listings.length) return;

    listings.forEach((listing) => {
      emitJoinListing(listing._id);
    });

    return () => {
      listings.forEach((listing) => {
        emitLeaveListing(listing._id);
      });
      removeSocketListeners();
    };
  }, [listings]);

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

    listenToNewBid(handleNewBid);
    return () => {
      removeSocketListeners();
    };
  }, [setListings]);
};

export default useListingsSocket;
