const app = require('./scoreboard');
const logger = require('./log/logger');
const _dbinit = require('./init');


app.listen(3000, () => {
    logger.info(`Sever is listening on http://localhost:3000/`);
    _dbinit();
});