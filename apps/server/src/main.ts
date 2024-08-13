import dotenv from 'dotenv';

import app from './app';
import config from './config';
import { logger } from './utils/logger';

dotenv.config();

const host = config.host;
const port = Number(config.port) || 4000;

app.listen(port, () => {
  logger.info(`Server running on: http://${host}:${port}`);
});
