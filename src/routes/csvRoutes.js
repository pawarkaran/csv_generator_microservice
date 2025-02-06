import express from 'express';
import CSVController from '../controllers/csvController.js';

const router = express.Router();

router.get('/generate-csv', CSVController.generateCSV);

export default router;
