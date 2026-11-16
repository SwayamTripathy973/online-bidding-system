import * as categoryService from '../services/category.service.js';

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.fetchAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const category = await categoryService.fetchCategoryById(categoryId);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryService.addCategory(name);
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const { name } = req.body;
    const updatedCategory = await categoryService.modifyCategory(categoryId, name);
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};