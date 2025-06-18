import { useEffect } from 'react';
import { listenToNewBid, emitJoinListing } from '@/lib/socketEvents';

export default function useSingleBidSocket(listingId, onNewBid) {
  useEffect(() => {
    if (!listingId) return;

    emitJoinListing(listingId);

    const handleNewBid = ({ listingId: incomingId, bid }) => {
      if (incomingId === listingId) {
        onNewBid(bid);
      }
    };

    listenToNewBid(handleNewBid);

    return () => {};
  }, [listingId, onNewBid]);
}
