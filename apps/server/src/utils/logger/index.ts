import pino from 'pino';

export const logger = pino({
  level: 'info',
  serializers: pino.stdSerializers,
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  transport: {
    target: 'pino-pretty', // for production we can use sentry
    level: 'error',
  },
});
