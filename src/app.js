import express from 'express';
import config from './config/config.js';
import csvRoutes from './routes/csvRoutes.js';
import logger from './utils/logger.js';

const app = express();

app.use(express.json());
app.use('/api', csvRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.error(err);

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

app.listen(config.PORT, () => {
  logger.info(`Server started on port ${config.PORT}`);
});
