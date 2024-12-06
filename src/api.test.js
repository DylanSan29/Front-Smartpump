const request = require('supertest');
const app = require('./App');

describe('POST /api/login', () => {
  it('should return 200 and a token for valid credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'henderson.briggs@geeknet.net', password: '23derd*334' });

    expect(response.body.token).toBeDefined();
  });

  it('should return 400 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'user@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Correo o contraseña incorrectos');
  });
});
