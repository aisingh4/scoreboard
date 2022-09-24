const router = require('express').Router();
const redisClient = require('../db/redis');
const Score = require('../models/score');

/**
 * @description If the user does not already exists,
 * create the user along with the given score, else
 * update its score
 * User is created/updated in both the collections as 
 * well as the ordered set
 * 
 * @returns a success response on completion
 * 
 * Sample JSON Object:
 * {
 *  "userid": <valid user id>,
 *  "points": <score of user>,
 * }
 */
 router.post('/', (req, res, next) => {
    Score.updateOne({ userId: req.body.userId}, {points: req.body.points}, {upsert: true}, ((err) => {
        if(err){
            console.log('Score cannot be created/updated in the Collections',err);
            res.status(400).send({error: 'Score cannot be created/updated'});
        }
        redisClient.zadd('scores', req.body.points, req.body.userId, ((err)=>{
            if(err){
                console.log('Score cannot be created/updated in the ordered set', err);
                res.status(400).res.send({error: 'Score cannot be created/updated'});
            }
            res.status(200).send('Score created/updated');
        }));
    }));
})
module.exports = router;