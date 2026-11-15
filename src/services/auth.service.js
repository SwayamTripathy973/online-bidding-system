import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user.repository.js';
import AppError from '../utils/AppError.js';

// Helper method to generate a JWT token containing user id and role
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};
// create a new user and return the user object 
export const registerUser = async ({ email, password, name }) => {
  // Check if email is already taken
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new AppError('A user with this email already exists.', 409);
  }

  // Hash the plain-text password
  const saltRounds = 9;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await userRepository.createUser({
    email,
    password: hashedPassword,
    name,
    role: 'USER',
  });

  const token = generateToken(newUser);
const userWithoutPassword = {
  id: newUser.id,
  name: newUser.name,
  email: newUser.email,
  role: newUser.role,
}
return  userWithoutPassword;
 
};
// login user and return the user object along with a JWT token
export const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  // Compare   password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password.', 401);
  }

  const token = generateToken(user);

  // Build user object without the password field
  const userWithoutPassword = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  return { user: userWithoutPassword, token };
};