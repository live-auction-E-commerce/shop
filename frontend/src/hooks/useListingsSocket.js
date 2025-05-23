// Remove comments. Your code should be understandable without comments.
/**
 * Custom hook to manage socket connections for multiple listings.
 *
 * - Joins socket rooms for each listing when the listings array changes.
 * - Leaves those socket rooms and cleans up listeners on unmount or listings update.
 * - Listens for incoming "new bid" events on any of the listings.
 * - Updates the matching listing's currentBid in the listings state when a new bid arrives,
 *   triggering a UI update across the listings list.
 *
 * @param {Array} listings - Array of listing objects currently displayed.
 * @param {Function} setListings - State setter function for updating listings.
 */

import { useEffect } from 'react';
import {
  emitJoinListing,
  emitLeaveListing,
  listenToNewBid,
  removeSocketListeners,
} from '@/lib/socketEvents';

const useListingsSocket = (listings, setListings) => {
  // Join socket rooms when listings change
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

  // Listen for new bids
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
