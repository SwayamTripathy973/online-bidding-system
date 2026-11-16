import { Router } from 'express';
import { body, param } from 'express-validator';
import * as categoryController from '../controllers/category.controller.js';
import { authenticate, authorizeRole } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

// 1. GET /api/categories (PUBLIC)
router.get('/', categoryController.getAllCategories);

// 2. GET /api/categories/:id (PUBLIC)
router.get(
  '/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('Category ID must be a positive integer.'),
    validate,
  ],
  categoryController.getCategoryById
);

// 3. POST /api/categories (ADMIN)
router.post(
  '/',
  authenticate,
  authorizeRole('ADMIN'),
  [
    body('name')
      .isString()
      .withMessage('Category name must be text.')
      .trim()
      .notEmpty()
      .withMessage('Category name is required.'),
    validate,
  ],
  categoryController.createCategory
);

// 4. PUT /api/categories/:id (ADMIN)
router.put(
  '/:id',
  authenticate,
  authorizeRole('ADMIN'),
  [
    param('id').isInt({ min: 1 }).withMessage('Category ID must be a positive integer.'),
    body('name')
      .isString()
      .withMessage('Category name must be text.')
      .trim()
      .notEmpty()
      .withMessage('Category name is required.'),
    validate,
  ],
  categoryController.updateCategory
);

export default router;