import redis from 'redis';

const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
});

// (async () => {
//     await redisClient.connect();
//     console.log("Connected to redis");
// })();

const connectedToRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis");
    }
    catch (error) {
        console.log("Failed to connect Redis", error);
    }
}

connectedToRedis();

export { redisClient };