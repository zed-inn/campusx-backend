import { createClient } from "redis";
import { env } from "@config/env";

const client = createClient({ url: env.REDIS_URI });

export const connectRedis = async () => {
  try {
    await client.connect();
    return true;
  } catch (error) {
    console.log("Failed to connect to redis");
  }
  return false;
};

export const disconnectRedis = async (fn: Function | null = null) => {
  try {
    await client.close();
    if (fn) fn();
    return true;
  } catch (error) {
    return false;
  }
};

export const flushCache = async () => {
  try {
    await client.flushDb();
    return true;
  } catch (error) {
    return false;
  }
};

export default client;
