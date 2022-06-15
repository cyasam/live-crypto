import { createClient } from 'redis';

let client;

const connectRedisServer = async () => {
  client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  console.log('Connected to Redis');
};

export const getCache = async (key) => {
  return await client.get(key);
};

export const setCache = async (key, value) => {
  return await client.set(key, value);
};

export default connectRedisServer;
