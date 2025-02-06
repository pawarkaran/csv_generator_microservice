import APIService from '../services/apiService.js';
import CSVService from '../services/csvService.js';
import logger from '../utils/logger.js';
import { createAppError } from '../utils/errorHandler.js';

const combineCsvData = (users, posts, comments) => {
  return users
    .map((user) => {
      const userPosts = posts.filter((post) => post.userId === user.id);
      const userComments = comments.filter((comment) =>
        userPosts.some((post) => post.id === comment.postId)
      );

      return userPosts.map((post) => ({
        id: user.id,
        name: user.name,
        title: post.title,
        body: userComments.find((c) => c.postId === post.id)?.body || '',
      }));
    })
    .flat();
};

const generateCSV = async (req, res, next) => {
  try {
    logger.info('CSV Generation Initiated');

    const { users, posts, comments } = await APIService.fetchAllData();
    const combinedData = combineCsvData(users, posts, comments);
    const csvPath = await CSVService.generateCSV(combinedData);

    res.status(200).json({
      success: true,
      message: 'CSV Generated Successfully',
      filePath: csvPath,
    });
  } catch (error) {
    logger.error('CSV Generation Failed', error);
    next(createAppError('CSV Generation Failed', 500));
  }
};

export default { generateCSV };
