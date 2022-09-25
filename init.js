const mongodb = require('./db/mongodb');
const redisClient = require('./db/redis');
const Score = require('./models/score');
const User = require('./models/user');
const logger = require('./log/logger');

function _dbinit(){

    if(mongodb.connection.readyState) {
        redisClient.del('scores');
        Score.find().exec((err,scoreInfo) =>{
            if(err){
                logger.info('No score data.\n' + err);
            }
            scoreInfo.forEach(info => {
                redisClient.zadd('scores', info.points, info.userId, (err) => {
                    if (err) {
                        logger.info('Scores could not be loaded in ordered set\n' + err);
                    }
                });
            });
            logger.info('Scores loaded in ordered set!');
        });

        User.find().exec((err, userInfo) =>{
            if(err){
                logger.info('No users data.' + err);
            }
            userInfo.forEach(info => {
                redisClient.del(info.userId);
                redisClient.hmset(info.userId, ["name", info.name, "country", info.country], (err) => {
                    if (err) {
                        logger.info('User info could not be loaded in ordered set\n' + err);
                    }
                });
            });
            logger.info('User info loaded in hash set!');
        });
    }
}
module.exports = _dbinit;
