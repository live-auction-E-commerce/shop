import { Worker } from 'bullmq';
import { redis } from './queue.js';
import { finishAuction } from '../lib/auction.js';
import connectDB from '../lib/db.js';

async function startWorker() {
  try {
    await connectDB();

    const auctionWorker = new Worker(
      'auctionQueue',
      async (job) => {
        const { listingId } = job.data;

        try {
          console.log(`🎯 Starting auction finish for listing ${listingId}`);
          await finishAuction(listingId);
          console.log(`✅ Finished auction for listing ${listingId}`);
        } catch (err) {
          console.error(
            `❌ Error finishing auction for listing ${listingId}:`,
            err.message,
          );
          throw err;
        }
      },
      { connection: redis },
    );

    auctionWorker.on('failed', (job, err) => {
      console.error(`🔥 Job ${job.id} failed with error: ${err.message}`);
    });

    console.log('🚀 Auction worker is up and running');
  } catch (err) {
    console.error('❌ Failed to start auction worker:', err.message);
    process.exit(1);
  }
}

startWorker();
