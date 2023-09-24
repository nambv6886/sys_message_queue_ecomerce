'use strict'

const { connectToRabbitMQ, consumerQueue } = require('../dbs/init.rabbit');

const messageService = {
  consumerToQueue: async (queueName) => {
    try {
      const {channel, connection} = await connectToRabbitMQ();

      await consumerQueue({channel, queueName})
    } catch (err) {
      console.log('Error consumer queue', err)
    }
  },

  // case processing
  consummertoQueueNormal: async (queueName) => {
    try {
      const { channel, connection} = await connectToRabbitMQ();

      const notiQueue = 'notiQueueProcess';

      // test fail mssage
      const timeExperid = 15000;
      setTimeout(() => {
        channel.consumer(notiQueue, msg => {
          console.log(`Send notiQueue success:: ${msg.content.toString()}`),
          channel.ack(msg)
        })
      }, timeExperid);



    } catch (err ){
      console.error(err);
    }
  },

    // case failed processing
    consummertoQueueFailed: async (queueName) => {
      try {
        const { channel, connection} = await connectToRabbitMQ();

        const notificationExchangeDLX = 'notificationExDLX';
        const notiRoutingKeyDLX = 'notiRoutingKeyDLX'; // assert

        const notiQueueHandler = 'notiQueueHotFix';
        await channel.assertExchange(notificationExchangeDLX, 'direct', {
          durable: true
        })
        const queueResult = await channel.assertQueue(notiQueueHandler, {
          exclusive: true
        })

        await channel.bindQueue(queueResult.queue, notificationExchangeDLX,notiRoutingKeyDLX )
        await channel.consumer(queueResult.queue, msgFailed => {
          console.log(`This notification error, pls hotfix`, msgFailed.contect.toString())
        }, {
          noAck: true
        })
      } catch (err ){
        console.log('Error: ',err);
        throw err;
      }
    }
}

module.exports = messageService