import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

// Verifies the Bearer JWT token and attaches user info (id, role) to req.user
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check if http header contains the Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Access denied. No token provided.', 401));
  }

  //const token = authHeader.split(' ');
  const token = authHeader.slice(7).trim(); // Remove 'Bearer ' prefix
  if (!token) {
  return next(new AppError('Authentication required.', 401));
}

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    //console.log('JWT Verify Error:', error.message);
    return next(new AppError('Invalid or expired token.', 401));
  }
};

// Restricts access to specific roles (e.g., 'ADMIN')
export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return next(new AppError('Access denied. You do not have permission to perform this action.', 403));
    }
    next();
  };
};