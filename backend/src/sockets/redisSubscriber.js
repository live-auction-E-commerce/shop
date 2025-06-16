import IORedis from 'ioredis';
import { io } from '../../server.js';

const redisSubscriber = new IORedis(process.env.REDIS_URL);

export async function startRedisSubscriber() {
  redisSubscriber.on('error', (err) =>
    console.error('Redis Subscriber Error', err),
  );

  // Subscribe to the channel without callback
  await redisSubscriber.subscribe('auction-ended');

  // Listen for published messages on subscribed channels
  redisSubscriber.on('message', (channel, message) => {
    if (channel === 'auction-ended') {
      try {
        const { listingId, winnerData } = JSON.parse(message);

        io.to(listingId).emit('auction-ended', {
          message: 'Auction has ended!',
          winner: winnerData,
        });

        console.log(`Emitted auction-ended event for listing ${listingId}`);
      } catch (err) {
        console.error('Error parsing auction-ended message:', err);
      }
    }
  });

  console.log('Redis subscriber listening for auction-ended events');
}
