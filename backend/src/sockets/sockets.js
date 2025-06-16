import { io } from '../../server.js';

export function handleListingSocketConnection(socket) {
  // When a client joins a specific listing room
  socket.on('join-listing', (listingId) => {
    socket.join(listingId);
    console.log(`Socket ${socket.id} joined listing room: ${listingId}`);

    socket.to(listingId).emit('socket-joined-your-room', {
      message: `has joined the room.`,
      userId: socket.id,
    });
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });

  socket.on('leave-listing', (listingId) => {
    socket.leave(listingId);
    console.log(`Socket ${socket.id} left listing room: ${listingId}`);
  });

  socket.on('new-bid', ({ listingId, bid }) => {
    socket.to(listingId).emit('new-bid', {
      listingId,
      bid,
    });

    console.log(`Broadcasting bid to room ${listingId}:`, bid);
  });
}

export function broadcastAuctionEnd(listingId, winnerData) {
  io.to(listingId).emit('auction-ended', {
    message: 'Auction has ended!',
    winner: winnerData,
  });

  console.log(`Auction ended for listing ${listingId}. Winner:`, winnerData);
}
