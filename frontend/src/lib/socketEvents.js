import socket from '@/services/socket';

export const emitJoinListing = (listingId) => {
  socket.emit('join-listing', listingId);
};

export const emitLeaveListing = (listingId) => {
  socket.emit('leave-listing', listingId);
};

export const emitNewBid = (listingId, bid) => {
  socket.emit('new-bid', {
    listingId,
    bid: {
      userId: bid.userId,
      amount: bid.amount,
      createdAt: bid.createdAt,
    },
  });
};
export const listenToJoinRoom = (callback) => {
  socket.on('socket-joined-your-room', callback);
};

export const listenToNewBid = (callback) => {
  socket.on('new-bid', callback);
};

export const removeSocketListeners = () => {
  socket.off('socket-joined-your-room');
  socket.off('new-bid');
  socket.off('auction-ended');
  socket.off('listing-purchased');
};

export const listenToAuctionEnd = (callback) => {
  socket.on('auction-ended', callback);
};

export const emitPurchase = ({ listingId }) => {
  socket.emit('listing-purchased', { listingId });
};

export const listenToPurchase = (callback) => {
  socket.on('listing-purchased', callback);
};
