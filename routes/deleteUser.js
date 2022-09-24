const router = require('express').Router();
const redisClient = require('../db/redis');
const Score = require('../models/score');

/**
 * @description Deletes the user and its score from the persistent storage,
 * as well as from the cache.
 * @param {string} user_id - The user's id that we want to delete
 * @returns Returns success message if the user is deleted successfully
 * or error message in case in case of error
 */
 router.delete('/:userId', (req, res) => {
    
    Score.deleteOne({userId: req.params.userId}, (err, response)=> {
        if (err) {
            console.log("User could not be deleted from Collections.", err);
            res.status(400).send({error: "User could not be deleted"});
        } else {
            redisClient.zrem('scores', req.params.userId, function(err) {
                if (err) {
                    console.log("User could not be removed from sorted set.", err);
                    res.status(400).send({error: "User could not be deleted"});
                }
                 res.status(200).send(req.params.userId + ' is removed');
            })
            //redisClient.del(req.params.userId);
        }
    })
})
module.exports = router;
