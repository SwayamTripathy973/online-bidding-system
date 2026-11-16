import * as categoryRepo from '../repositories/category.repository.js';
import AppError from '../utils/AppError.js';

export const fetchAllCategories = async () => {
  const categories = await categoryRepo.getAll();
  return categories;
};

export const fetchCategoryById = async (categoryId) => {
  const category = await categoryRepo.getById(categoryId);

  if (!category) {
    throw new AppError('Category not found.', 404);
  }

  return category;
};

export const addCategory = async (name) => {
  const cleanName = name.trim();
  const existingCategory = await categoryRepo.getByName(cleanName);

  if (existingCategory) {
    throw new AppError('Name already exists.', 409);
  }

  const created = await categoryRepo.create(cleanName);
  return created;
};

export const modifyCategory = async (categoryId, name) => {
  const existingCategory = await categoryRepo.getById(categoryId);

  if (!existingCategory) {
    throw new AppError('Category not found.', 404);
  }

  const cleanName = name.trim();
  const duplicateCategory = await categoryRepo.getByName(cleanName);

  if (duplicateCategory && duplicateCategory.id !== categoryId) {
    throw new AppError('Another category with this name already exists.', 409);
  }

  const updated = await categoryRepo.update(categoryId, cleanName);
  return updated;
};