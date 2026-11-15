import { validationResult } from 'express-validator';

// Checks express-validator results and returns the required { errors: [] } format
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = [];
    for (const err of errors.array()) {
      errorMessages.push(err.msg);
    }
    return res.status(400).json({ errors: errorMessages });
  }

  next();
};