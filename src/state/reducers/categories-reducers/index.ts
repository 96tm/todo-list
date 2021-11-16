import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  IAddTaskToCategoryPayload,
  RemoveTaskFromCategoryPayload,
  ICategoriesState,
} from '../../models/categories-state';
import { ICategory } from '../../models/category';
import {
  addChildToCategory,
  createCategory,
  createCategoryFailed,
  createCategorySucceeded,
} from './createCategory';
import {
  deleteCategoryById,
  deleteCategoryByIdFailed,
  deleteCategoryByIdSucceeded,
  removeCategoryChildren,
  removeChildFromAllCategories,
  removeChildFromCategory,
} from './deleteCategoryById';
import {
  updateCategory,
  updateCategoryFailed,
  updateCategorySucceeded,
} from './updateCategory';

const addTaskToCategory: CaseReducer<
  ICategoriesState,
  PayloadAction<IAddTaskToCategoryPayload>
> = (state, action) => {
  const { categories } = state;
  const { categoryId, taskId } = action.payload;
  const category = categories[categoryId] as ICategory;
  category.taskIds[taskId] = taskId;
  state.error = null;
  return state;
};

const removeTaskFromCategory: CaseReducer<
  ICategoriesState,
  PayloadAction<RemoveTaskFromCategoryPayload>
> = (state, action) => {
  const { categories } = state;
  const { categoryId, taskId } = action.payload;
  const category = categories[categoryId];
  if (!category) {
    state.error = 'Category not found';
    return state;
  }
  delete category.taskIds[taskId];
  state.error = null;
  return state;
};

const removeTaskFromAllCategories: CaseReducer<
  ICategoriesState,
  PayloadAction<string>
> = (state, { payload: taskId }) => {
  const { categories: initialCategories } = state;
  const initialResult: Record<string, ICategory> = {};
  const categories = Object.keys(initialCategories).reduce((result, key) => {
    const category = initialCategories[key];
    if (category) {
      delete category?.taskIds[taskId];
      result[key] = category;
    }
    return result;
  }, initialResult);
  state.error = null;
  state.categories = categories;
  return state;
};

const categoriesReducers = {
  createCategory,
  createCategorySucceeded,
  createCategoryFailed,
  addChildToCategory,
  updateCategory,
  updateCategorySucceeded,
  updateCategoryFailed,
  deleteCategoryById,
  deleteCategoryByIdFailed,
  deleteCategoryByIdSucceeded,
  removeCategoryChildren,
  removeChildFromCategory,
  removeChildFromAllCategories,
  addTaskToCategory,
  removeTaskFromCategory,
  removeTaskFromAllCategories,
};

export default categoriesReducers;
