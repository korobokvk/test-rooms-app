import amqp, { Connection, Channel } from 'amqplib';
import EnvVars from '@src/constants/EnvVars';
import { IUser } from '@src/models/User';
import RoomService from '@src/services/RoomService';
import UserService from '@src/services/UserService';

// Connect to queue broker
let channel: Channel;
export const connection = async () => {
  const connectionAddress = EnvVars.RabbitMqUrl;
  const connection: Connection = await amqp.connect(connectionAddress);
  channel = await connection.createChannel();
  await channel.assertQueue('UserChanel');

  channel.consume('UserChanel', async (data) => {
    if (data?.content) {
      const parsedData = Buffer.from(data.content);
      const userData = JSON.parse(parsedData.toString()) as IUser;
      const user = await UserService.addOne(userData);
      console.log(user);
      channel.ack(data);
    }
  });
};
