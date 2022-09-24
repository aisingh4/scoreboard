const redis = require("redis");

//Connect redisClient
const redisClient = redis.createClient();

redisClient.on('error', err => {
    console.log('Redis connection error\n' + err);
});

redisClient.on('connect', ()=> {
    console.log("Redis is connected!");
});

module.exports = redisClient;