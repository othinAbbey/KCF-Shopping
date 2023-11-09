const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is named 'app'

describe('User Routes', () => {
  it('should sign up a new user successfully', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example3.com',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/auth/signup')
      .send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should fail if required fields are missing during signup', async () => {
    const invalidUser = {
      // Missing 'password' field
      username: 'testuser',
      email: 'test@example3.com',
    };

    const response = await request(app)
      .post('/auth/signup')
      .send(invalidUser);

    expect(response.statusCode).toBe(400); // Assuming missing required fields returns 400 status
  });
});
