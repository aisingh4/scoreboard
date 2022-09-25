const redis = require("redis");
const logger = require("../log/logger");

//Connect redisClient
const redisClient = redis.createClient();

redisClient.on('error', err => {
   logger.info('Redis connection error');
});

redisClient.on('connect', ()=> {
    logger.info("Redis is connected!");
});

module.exports = redisClient;