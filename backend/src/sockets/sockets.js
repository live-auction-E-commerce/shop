export function handleListingSocketConnection(socket) {
  // When a client joins a specific listing room
  socket.on('join-listing', (listingId) => {
    socket.join(listingId);
    console.log(`Socket ${socket.id} joined listing room: ${listingId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });

  socket.on('leave-listing', (listingId) => {
    socket.leave(listingId);
    console.log(`Socket ${socket.id} left listing room: ${listingId}`);
  });
}

// Function to broadcast a new bid to all clients in that listing room
export function broadcastNewBid(io, listingId, bid) {
  io.to(listingId).emit('new-bid', bid);
}
