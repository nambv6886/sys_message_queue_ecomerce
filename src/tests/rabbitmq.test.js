'use strict'

const { connectToRabbitMQForTest } = require('../dbs/init.rabbit');

describe('RabbitMQ connect', () => {
  it('Should connect to successfult ', async () => {
    const result = await connectToRabbitMQForTest();

    expect(result).toBeUndefined();
  })
})