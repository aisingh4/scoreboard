const router = require('express').Router();
const redisClient = require('../db/redis');
const logger = require('../log/logger');

/**
 * @description Fetches the rank of the user
 * given a userId
 * 
 * @returns the rank of the user
 * 
 * @param {string} userId - The user's id whose rank is required
 */
 router.get('/:userId', (req, res, next) => {
    redisClient.zrevrank('scores', req.params.userId, (err, rank) => {
        if (err) {
            logger.info('Rank cannot be fetched', err);
            res.status(400).send({error: 'Rank cannot be fetched'});
        } 
        var playerRank = req.params.userId + " rank is: " + modifyPlayerRank(rank+1);
        logger.info(playerRank);
        res.status(200).send(playerRank);
    })
})

/**
 * @description Modifies the rank string with suffix
 * Puts the number sufficies at the end of the number
 * @param {number} rank - Player's rank
 * @returns String rank number
 */
 function modifyPlayerRank(rank) {
    
    if (rank % 10 === 1) {
        return rank.toString() + "st"
    } else if (rank % 10 === 2) {
        return rank.toString() + "nd"
    } else if (rank % 10 === 3) {
        return rank.toString() + "rd"
    } else {
        return rank.toString() + "th"
    }
}
module.exports = router;