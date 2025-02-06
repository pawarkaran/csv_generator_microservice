import pino from 'pino';
import fs from 'fs';
import path from 'path';
import config from '../config/config.js';

const isProduction = process.env.NODE_ENV === 'production';

fs.mkdirSync(config.PATHS.LOGS_DIR, { recursive: true });

const fileTransport = pino.destination(
  path.join(config.PATHS.LOGS_DIR, 'app.log')
);

const transports = isProduction
  ? [fileTransport]
  : [
      fileTransport,
      pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      }),
    ];

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
  },
  pino.multistream(transports)
);

export default logger;
