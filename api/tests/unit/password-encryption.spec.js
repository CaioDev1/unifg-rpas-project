const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');
const User = require('../../models/User');

describe('Single MongoMemoryServer', () => {
  /** @type {MongoClient} */
  let con;
  /** @type {MongoMemoryServer} */
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()

    const uri = mongoServer.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    con = await mongoose.connect(uri, mongooseOpts);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('Should encrypt user password on creation', async () => {

    const user = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'password123',
      phone: '123-456-7890',
    })

    expect(user.password).not.toBe('password123');

    const valid = bcrypt.compareSync('password123', user.password)

    expect(valid).toBe(true);
  })
});