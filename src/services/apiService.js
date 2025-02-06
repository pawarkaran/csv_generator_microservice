import axios from 'axios';
import logger from '../utils/logger.js';
import { createAPIError } from '../utils/errorHandler.js';
import config from '../config/config.js';

const fetchData = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: config.REQUEST_TIMEOUT,
    });
    return response.data;
  } catch (error) {
    logger.error(`API Request Error for ${url}: ${error.message}`);
    throw createAPIError(`Failed to fetch data from ${url}`, 500);
  }
};

const fetchAllData = async () => {
  try {
    const [users, posts, comments] = await Promise.all([
      fetchData(config.API_ENDPOINTS.USERS),
      fetchData(config.API_ENDPOINTS.POSTS),
      fetchData(config.API_ENDPOINTS.COMMENTS),
    ]);

    return { users, posts, comments };
  } catch (error) {
    logger.error('Parallel API Fetch Failed', error);
    throw error;
  }
};

export default { fetchAllData };
