const request = require('supertest');
const app = require('../scoreboard');

/**
 * Assume redis is already connected & has data
 */
describe('top 5 scores', () => {

  it('fetchScore should return status code 200 and count 5', async() => {
    const response = await request(app)
      .get('/scoreboard');
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(5);
  });

  it('fetchRank should return status code 200', async() => {
    const response = await request(app)
      .get('/rank/aisingh');
    expect(response.statusCode).toEqual(200);
  });
  
});