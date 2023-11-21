const request = require('supertest');
const app = require('../../../app');
const { default: mongoose } = require('mongoose');

describe('Users', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log('connected')
  })

  it('should get all users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new user', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe.jest@example.com',
      password: 'password123', // You may want to hash the password before seeding
      address: '456 Oak Street',
      phone: '123-456-7890',
      admin: false,
      favorites: [],
    };

    const response = await request(app).post('/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(newUser.title);
  });
});
