import ratelimit from "../config/upstash.js";


export default async function rateLimiter(req, res, next) {
    try {
        const { success } = await ratelimit.limit("My-User-Id");
        if (!success) {
            return res.status(429).json({ error: "Too many requests, try again later" });
        }
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
}