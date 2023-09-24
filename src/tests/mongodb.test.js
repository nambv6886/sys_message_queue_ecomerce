'use strict'

const mongoose = require('mongoose');
const connectString = 'mongodb://localhost:27017/shopjs';

const TestSchema = new mongoose.Schema({
  name: String
});

const Test = mongoose.model('Test', TestSchema);

describe('Mongoose connection', () => {
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect(connectString);
  })

  afterAll(async () => {
    await connection.disconnect();
  })

  it('should connect to mongoose success', () => {
    expect(mongoose.connection.readtState).toBe(1);
  })

  it('should save a document to db success', async () => {
    const user = new Test({name: 'name'});
    await user.save();
    expect(user.isNew).toBe(true);
  })

})