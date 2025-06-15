import * as BullMQ from 'bullmq';
import IORedis from 'ioredis';
import config from '../../config.js';

const { Queue } = BullMQ;

export const redis = new IORedis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
});
export const auctionQueue = new Queue('auctionQueue', { connection: redis });
