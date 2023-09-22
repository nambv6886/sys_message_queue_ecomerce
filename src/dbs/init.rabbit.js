'use strict'

const amqplib = require('amqplib');

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect('amqp://localhost');
    if (!connection) throw new Error('Connection not established')

    const channel = await connection.createChannel();

    return {channel, connection};
  } catch (error) {
    console.log('err:', error)
  }
}

const connectToRabbitMQForTest = async () => {
  try {
    const {channel, connection} = await connectToRabbitMQ();

    const queue = 'test-queue';
    const message = 'Hello';

    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(message));

    await connection.close();
  } catch (err) {
    console.log('err:', err)
  }
}

module.exports = {
  connectToRabbitMQ,
  connectToRabbitMQForTest
}