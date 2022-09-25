const mongoose = require('mongoose');
const logger = require('../log/logger');

const url = 'mongodb://localhost/scoreboard';

//Connect MongoDB
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 2000}, (err)=> {
    if(err){
        logger.info('MongoDB connection error');
    }else{
        logger.info('MongoDB is connected!');
    }
});

module.exports = mongoose;