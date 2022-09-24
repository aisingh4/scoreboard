var mongoose = require('mongoose');
let Score = mongoose.model('scores',{
    userId: String,
    points: String
});

module.exports = Score;