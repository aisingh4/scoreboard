const express = require("express");
const mongodb = require('./db/mongodb');

const fetchScores = require('./routes/fetchScores');
const fetchRank = require('./routes/fetchRank');
const updateScore = require('./routes/updateScore');
const deleteUser = require('./routes/deleteUser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/scoreboard', fetchScores);
app.use('/rank', fetchRank);
app.use('/updateScore', updateScore);
app.use('/deleteUser', deleteUser);

module.exports = app;