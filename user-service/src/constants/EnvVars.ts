/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */

export default {
  NodeEnv: process.env.NODE_ENV ?? '',
  Port: process.env.PORT ?? 0,
  DbName: process.env.DB_NAME ?? 'postgres',
  DbUser: process.env.DB_USER ?? 'postgres',
  DbPassword: process.env.DB_PASSWORD ?? 'postgres',
  DbHost: process.env.DB_HOST ?? 'localhost',
  DbPort: process.env.DB_PORT ?? '5433',
  RabbitMqUrl: process.env.RABBIT_URL ?? 'amqp://guest:guest@localhost:5672',
  UserChannel: process.env.USER_CHANNEL ?? '',
  Jwt: {
    Secret: process.env.JWT_SECRET ?? '',
    Exp: process.env.JWT_EXP ?? '',
  },
} as const;
