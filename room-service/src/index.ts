import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import server from './server';
import { sequelize } from './models';

// **** Run **** //

const SERVER_START_MSG = 'Express server started on port: ' + EnvVars.Port.toString();

sequelize.sync({ force: false }).then(() => {
  server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
});
