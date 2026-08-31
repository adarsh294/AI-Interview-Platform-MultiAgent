import { redisClient } from "../redis.js";

export const ratelimit= async (req,res,next)=>{
try {
     const ip = req.ip; //  req.headers["x-forwarded-for"]
     const key = `ratelimit:${ip}`;
      const requests = await redisClient.incr(key);
      if (requests == 1) {
        redisClient.expire(key,60);
      }
      if (requests>5) {
         const ttl = await redisClient.ttl(key);
        return res.status(429).json({message:"too many request",try_after:ttl})
      };
      next();
} catch (err) {
 next(err)   
}
};