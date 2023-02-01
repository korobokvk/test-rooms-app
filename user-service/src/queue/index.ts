import amqp, { Connection, Channel } from 'amqplib';
import EnvVars from '@src/constants/EnvVars';
import { IUser } from '@src/models/User';

// Connect to queue broker
let channel: Channel;
export const connection = async () => {
  const connectionAddress = EnvVars.RabbitMqUrl;
  const connection: Connection = await amqp.connect(connectionAddress, 'heartbeat=60');
  channel = await connection.createChannel();
  await channel.assertQueue(EnvVars.UserChannel);
};

export const sendData = (data: IUser) => {
  // send data to queue
  const { email, name, id } = data;
  channel.sendToQueue(EnvVars.UserChannel, Buffer.from(JSON.stringify({ email, name, id })));
};
