import * as authService from '../services/auth.service.js';

// register user or login user controller functions

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const data = await authService.registerUser({ email, password, name });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser({ email, password });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};