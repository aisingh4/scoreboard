const router = require('express').Router();
const redisClient = require('../db/redis');
const logger = require('../log/logger');
const { promisify } = require('util');

/**
 * @description Fetches the top 5 scores of all time
 * Records are fetched from the ordered set
 * 
 * @returns List of JSON object that contains userId and scores
 */

router.get('/', (req, res, next) => {
    redisClient.zrevrange('scores', 0, 4, 'withscores', function(err, topscores){  
        if (err) {
            logger.info('Scoreboard cannot be generated' + err);
            res.status(400).send({error: 'Scoreboard cannot be generated'});
        }
        Promise.resolve(getScores(topscores)).then((result) => {
            logger.info('Scoreboard generated');
            res.status(200).send(result)
        });
    });
});

async function getScores(topscores){
    const getAsync = promisify(redisClient.hget).bind(redisClient); 
    var scoreObj = [];
    for(let i=0; i<10; i=i+2){
        var uname = await getAsync(topscores[i], 'name');
        var result = {
            'name': uname,
            'score': topscores[i+1]
        }
        scoreObj.push(result);
    }
    return scoreObj;
}
module.exports = router;