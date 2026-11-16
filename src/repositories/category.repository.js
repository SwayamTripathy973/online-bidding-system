import prisma from '../config/db.js';
// get all categories
export const getAll = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { id: 'asc' },
  });
  return categories;
};
// get specific id
export const getById = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  return category;
};
// get by name
export const getByName = async (categoryName) => {
  const category = await prisma.category.findUnique({
    where: { name: categoryName },
  });
  return category;
};
// create category with given name
export const create = async (categoryName) => {
  const newCategory = await prisma.category.create({
    data: { name: categoryName },
  });
  return newCategory;
};

// update category name by id
export const update = async (categoryId, categoryName) => {
  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data: { name: categoryName },
  });
  return updatedCategory;
};