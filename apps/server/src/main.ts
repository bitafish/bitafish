import app from './app';
import { logger } from './utils/logger';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(port, () => {
  logger.info(`Server running on: http://${host}:${port}`);
});
