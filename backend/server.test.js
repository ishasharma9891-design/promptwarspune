const request = require('supertest');
const app = require('./server');

describe('Yaris Backend API', () => {
  it('GET /api/health should return status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('GET /api/profile should return user profile', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('expertise_level');
  });

  it('POST /api/chat should validate input', async () => {
    const res = await request(app).post('/api/chat').send({ message: 123 });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
