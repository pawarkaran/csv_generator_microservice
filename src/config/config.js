import dotenv from 'dotenv';
import path from 'path';
import os from 'os';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  API_ENDPOINTS: {
    USERS: 'https://jsonplaceholder.typicode.com/users',
    POSTS: 'https://jsonplaceholder.typicode.com/posts',
    COMMENTS: 'https://jsonplaceholder.typicode.com/comments',
  },
  PATHS: {
    OUTPUT_DIR: path.resolve(process.cwd(), 'output'),
    LOGS_DIR: path.resolve(process.cwd(), 'logs'),
  },
  REQUEST_TIMEOUT: 10000,
  WORKER_POOL_SIZE:
    parseInt(process.env.WORKER_POOL_SIZE, 10) || os.cpus().length,
  WORKER_TIMEOUT: 30000,
};
