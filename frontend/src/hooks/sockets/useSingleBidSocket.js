import { useEffect } from 'react';
import { listenToNewBid } from '@/lib/socketEvents';

export default function useSingleBidSocket(listingId, onNewBid) {
  useEffect(() => {
    if (!listingId) return;

    const handleNewBid = ({ listingId: incomingId, bid }) => {
      if (incomingId === listingId) {
        onNewBid(bid);
      }
    };

    listenToNewBid(handleNewBid);

    return () => {};
  }, [listingId, onNewBid]);
}
