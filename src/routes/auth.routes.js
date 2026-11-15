import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.middleware.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

// ----POST /api/auth/signup

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.'),
    body('name').trim().notEmpty().withMessage('Name is required.'),
    validate,
  ],
  authController.register
);

// --------------POST /api/auth/login ------------------
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password').notEmpty().withMessage('Password is required.'),
    validate,
  ],
  authController.login
);

export default router;