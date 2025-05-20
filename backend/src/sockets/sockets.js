export function handleListingSocketConnection(socket) {
  // When a client joins a specific listing room
  socket.on('join-listing', (listingId) => {
    socket.join(listingId);
    console.log(`Socket ${socket.id} joined listing room: ${listingId}`);

    socket.to(listingId).emit('socket-joined-your-room', {
      message: `has joined the room.`,
      userId: socket.id,
    });

    console.log(`${socket.id} joined room ${listingId}`);
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

// Function to broadcast a new bid to all clients in that listing room
export function broadcastNewBid(io, listingId, bid) {
  io.to(listingId).emit('new-bid', bid);
}
