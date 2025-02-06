import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWorkerPool = (size) => {
  const queue = [];
  let activeWorkers = 0;

  const processNextTask = () => {
    activeWorkers--;

    if (queue.length > 0) {
      const { data, resolve, reject } = queue.shift();
      executeWorker(data).then(resolve).catch(reject);
    }
  };

  const executeWorker = (data) => {
    activeWorkers++;

    return new Promise((resolve, reject) => {
      const worker = new Worker(
        path.join(__dirname, '../workers/csvWorker.js'),
        {
          workerData: {
            data,
            outputDir: config.PATHS.OUTPUT_DIR,
          },
        }
      );

      worker.on('message', (result) => {
        processNextTask();
        result.success
          ? resolve(result.filePath)
          : reject(new Error(result.error));
      });

      worker.on('error', (error) => {
        processNextTask();
        reject(error);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          processNextTask();
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  };

  return async (data) => {
    if (activeWorkers < size) {
      return executeWorker(data);
    }

    return new Promise((resolve, reject) => {
      queue.push({ data, resolve, reject });
    });
  };
};

const workerPool = createWorkerPool(config.WORKER_POOL_SIZE);

export default workerPool;
