var mongoose = require('mongoose');
let User = mongoose.model('users',{
    userId: String,
    name: String,
    country: String,
});

module.exports = User;