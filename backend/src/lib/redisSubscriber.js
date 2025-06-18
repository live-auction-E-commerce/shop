import IORedis from 'ioredis';
import { handleAuctionEnd } from './events.js';

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

        handleAuctionEnd(listingId, winnerData);
      } catch (err) {
        console.error('Error parsing auction-ended message:', err);
      }
    }
  });

  console.log('Redis subscriber listening for auction-ended events');
}
