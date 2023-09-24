'use strict'

const { consumerQueue } = require('./src/dbs/init.rabbit');
const {
  consumerToQueue,
  consummertoQueueFailed,
  consummertoQueueNormal
} = require('./src/services/consumerQueue.service');

const queueName = 'test-topic';

// consumerToQueue(queueName).then(() => {
//   console.log(`Message consumer started: ${queueName}`)
// }).catch(err => console.log('Message Error: ', err.message))


consummertoQueueNormal(queueName).then(() => {
  console.log(`Message consummertoQueueNormal started:`)
}).catch(err => console.log('Message Error: ', err.message))

consummertoQueueFailed(queueName).then(() => {
  console.log(`Message consummertoQueueFailed started: `)
}).catch(err => console.log('Message Error: ', err.message))