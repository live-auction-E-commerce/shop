import { Worker } from 'bullmq';
import { redis } from './queue.js';
import IORedis from 'ioredis';
import { finishAuction } from './auction.js';
import config from '../../config.js';
import connectDB from '../lib/db.js';

const redisPublisher = new IORedis(config.REDIS_URL);

async function startWorker() {
  await connectDB();
  const auctionWorker = new Worker(
    'auctionQueue',
    async (job) => {
      const { listingId } = job.data;

      const { listingId: id, winnerData } = await finishAuction(listingId);

      await redisPublisher.publish(
        'auction-ended',
        JSON.stringify({ listingId: id, winnerData }),
      );
    },
    { connection: redis },
  );

  auctionWorker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed: ${err.message}`);
  });

  console.log('Auction worker running');
}

startWorker();
