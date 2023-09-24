'use strict'

const { consumerQueue } = require('./src/dbs/init.rabbit');
const {
  consumerToQueue
} = require('./src/services/consumerQueue.service');

const queueName = 'test-topic';

consumerToQueue(queueName).then(() => {
  console.log(`Message consumer started: ${queueName}`)
}).catch(err => console.log('Message Error: ', err.message))