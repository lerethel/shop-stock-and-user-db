import amqp from "amqplib/callback_api.js";
import { BaseEntity } from "../entities/base.entity.js";
import { Action } from "./action.enum.js";

export let reportAction: <T extends BaseEntity | BaseEntity[]>(content: {
  data: T;
  action: Action;
}) => void;

amqp.connect(process.env.RABBITMQ_URI!, (connectionError, connection) => {
  if (connectionError) {
    throw connectionError;
  }

  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }

    channel.assertQueue("reports", { durable: true });
    reportAction = (content) =>
      void channel.sendToQueue("reports", Buffer.from(JSON.stringify(content)));
  });
});
