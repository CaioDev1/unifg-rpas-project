const request = require('supertest');
const app = require('../../../app');
const mongoose = require('mongoose');
const seedData = require('../../../seed');

describe('Users', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    await seedData(process.env.MONGODB_URL);

    console.log('connected')
  })

  afterAll(async () => {
    await mongoose.connection.close();
  })

  const userPayload = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe.jest2@example.com',
    password: 'password123', // You may want to hash the password before seeding
    address: '456 Oak Street',
    phone: '123-456-7890',
    admin: false,
    favorites: [],
  };

  it('should create a new user', async () => {
    const response = await request(app).post('/users/register').send(userPayload);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('newUser');
    expect(response.body?.newUser?.email).toBe(userPayload.email);
  });

  it('should get all users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('allUsers')
    expect(Array.isArray(response.body?.allUsers)).toBeTruthy();
  });

  it('should delete a user', async () => {
    const userToDelete = Object.assign({}, userPayload);
    userToDelete.email = 'john.doe.delete-test@example.com'

    const userResponse = await request(app).post('/users/register').send(userToDelete);

    if(!userResponse.body?.newUser) throw new Error('No user to delete');

    const userId = userResponse.body?.newUser?._id;

    expect(userId).toBeTruthy();
    
    const response = await request(app).delete(`/users/${userId}`);
    
    expect(response.status).toBe(200);
  })

  it('should update a user', async () => {
    const userToUpdate = Object.assign({}, userPayload);

    userToUpdate.email = 'john.doe.update-test@example.com'

    const userResponse = await request(app).post('/users/register').send(userToUpdate);

    if(!userResponse.body?.newUser) throw new Error('No user to update');

    const createdUser = userResponse.body?.newUser;

    expect(createdUser._id).toBeTruthy();

    createdUser.firstName = 'John Updated'
    
    const response = await request(app).put(`/users/${createdUser._id}`).send(createdUser);
    
    expect(response.status).toBe(200);
  })
});