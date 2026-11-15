// Global error handler that ensures all errors match 


// eslint-disable-next-line no-unused-vars

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      errors: [err.message],
    });
  }

  // 500 unexpected server or database errors
  return res.status(500).json({
    errors: ['Internal server error.'],
  });
};