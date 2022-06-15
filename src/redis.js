import { createClient } from 'redis';

let client;

const connectRedisServer = async () => {
  client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  client.flushAll();

  console.log('Connected to Redis');
};

export const getCache = async (key) => {
  const value = await client.get(key);
  return JSON.parse(value);
};

export const setCache = async (key, value, options) => {
  value = typeof value === 'object' ? JSON.stringify(value) : value;
  return await client.set(key, value, options);
};

export const existCache = async (key) => {
  const value = await getCache(key);
  return !!value;
};

export default connectRedisServer;
