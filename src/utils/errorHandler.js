const createAppError = (message, statusCode, isOperational = true) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = isOperational;
  error.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

  Error.captureStackTrace(error, createAppError);
  return error;
};

const createAPIError = (message, statusCode = 500) =>
  createAppError(message, statusCode, false);

const createValidationError = (message) => createAppError(message, 400);

export { createAppError, createAPIError, createValidationError };
