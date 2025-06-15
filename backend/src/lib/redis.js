import IORedis from 'ioredis';
import config from '../../config.js';

const redis = new IORedis(config.REDIS_URL);

export default redis;
