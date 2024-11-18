import amqp from "amqplib/callback_api.js";
import { consumerHandlers } from "./consumer-handlers.js";

amqp.connect(process.env.RABBITMQ_URI, (connectionError, connection) => {
  if (connectionError) {
    throw connectionError;
  }

  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }

    channel.assertQueue("reports", { durable: true });

    channel.consume("reports", async (message) => {
      const { data, action } = JSON.parse(message.content.toString());
      await consumerHandlers[action]?.(data, action);
      channel.ack(message);
    });
  });
});
