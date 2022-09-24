var redisClient = require('../db/redis');
const Score = require('../models/score');
const User = require('../models/user');

const mongoose = require('mongoose');

//Connect MongoDB
mongoose.connect('mongodb://localhost/scoreboard',{
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err)=> {
    if(err){
        console.log('MongoDB connection error');
    }
    console.log('MongoDB is connected!');
    redisClient.del('scores');
    Score.find().exec((err,scoreInfo) =>{
        if(err){
            console.log('No score data.\n' + err);
        }
        scoreInfo.forEach(info => {
            redisClient.zadd('scores', info.points, info.userId, (err) => {
                if (err) {
                    console.log('Scores could not be loaded in ordered set\n' + err);
                } 
            });
        });
        console.log('Scores loaded in ordered set!');
    });

    User.find().exec((err, userInfo) =>{
        if(err){
            console.log('No users data.' + err);
        }
        userInfo.forEach(info => {
            redisClient.del(info.userId);
            redisClient.hmset(info.userId, ["name", info.name, "country", info.country], (err) => {
                if (err) {
                    console.log('User info could not be loaded in ordered set\n' + err);
                }
            });
        });
        console.log('User info loaded in hash set!'); 
    }); 
});

module.exports = mongoose;