import logger from '../utils/logger.js';
import workerPool from './workerManager.js';

const generateCSV = async (data) => {
  try {
    const filePath = await workerPool(data);
    logger.info(`CSV Generated: ${filePath}`);
    return filePath;
  } catch (error) {
    logger.error('CSV Generation Failed', error);
    throw error;
  }
};

export default { generateCSV };
