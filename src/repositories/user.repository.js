import prisma from '../config/db.js';

// Find user by  email 
export const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

// Create a new user and return all fileds except the password
export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
};