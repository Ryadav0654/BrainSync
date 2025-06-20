import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: true,
});

const ratelimit = async (ip: string) => {
  const { success, limit, remaining, reset } = await rateLimit.limit(ip);
  console.log("ratelimit: ", limit, remaining, reset);
  return success;
};

export default ratelimit;
