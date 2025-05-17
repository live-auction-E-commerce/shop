import socket from '@/socket';

export const emitJoinListing = (listingId) => {
  socket.emit('join-listing', listingId);
};

export const emitLeaveListing = (listingId) => {
  socket.emit('leave-listing', listingId);
};

export const emitNewBid = (listingId, bid) => {
  socket.emit('new-bid', { listingId, bid });
};
