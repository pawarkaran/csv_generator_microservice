import { parentPort, workerData } from 'worker_threads';
import fs from 'fs/promises';
import path from 'path';
import { createObjectCsvWriter } from 'csv-writer';

const generateCSV = async (data, outputDir) => {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    const filename = `data_export_${Date.now()}.csv`;
    const filePath = path.join(outputDir, filename);

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'title', title: 'Title' },
        { id: 'body', title: 'Body' },
      ],
    });

    const csvData = data.map((item) => ({
      // id: item.id,
      name: item.name || '',
      title: item.title || '',
      body: item.body || '',
    }));

    await csvWriter.writeRecords(csvData);
    return filePath;
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  try {
    const { data, outputDir } = workerData;
    const filePath = await generateCSV(data, outputDir);
    parentPort.postMessage({ success: true, filePath });
  } catch (error) {
    parentPort.postMessage({ success: false, error: error.message });
  }
})();
