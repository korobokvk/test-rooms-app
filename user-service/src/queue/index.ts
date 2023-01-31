import amqp, { Connection, Channel } from 'amqplib';
import EnvVars from '@src/constants/EnvVars';
import { IUser } from '@src/models/User';

// Connect to queue broker
let channel: Channel;
export const connection = async () => {
  const connectionAddress = EnvVars.RabbitMqUrl;
  const connection: Connection = await amqp.connect(connectionAddress);
  channel = await connection.createChannel();
  await channel.assertQueue('UserChanel');
};

export const sendData = (data: IUser) => {
  // send data to queue
  channel.sendToQueue('UserChanel', Buffer.from(JSON.stringify(data)));
};
