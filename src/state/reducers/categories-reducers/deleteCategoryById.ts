import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  ICategoriesState,
  RemoveChildFromCategoryPayload,
} from 'src/state/models/categories-state';
import { ICategory } from 'src/state/models/category';

export const deleteCategoryById: CaseReducer<
  ICategoriesState,
  PayloadAction<string>
> = (state) => {
  return state;
};

export const deleteCategoryByIdSucceeded: CaseReducer<
  ICategoriesState,
  PayloadAction<string>
> = (state, action) => {
  const { categories } = state;
  const categoryId = action.payload;
  delete categories[categoryId];
  state.error = null;
  return state;
};

export const deleteCategoryByIdFailed: CaseReducer<
  ICategoriesState,
  PayloadAction<string>
> = (state, action) => {
  state.error = action.payload;
  return state;
};

export const removeCategoryChildren: CaseReducer<
  ICategoriesState,
  PayloadAction<string>
> = (state, action) => {
  const initialResult: Record<string, ICategory> = {};
  const categories = Object.keys(state.categories).reduce((result, key) => {
    if (state.categories[key]?.parentId !== action.payload) {
      result[key] = state.categories[key] as ICategory;
    }
    return result;
  }, initialResult);
  state.error = null;
  state.categories = categories;
  return state;
};

export const removeChildFromCategory: CaseReducer<
  ICategoriesState,
  PayloadAction<RemoveChildFromCategoryPayload>
> = (state, action) => {
  const { parentId, categoryId } = action.payload;
  const { categories } = state;
  const parentCategory = categories[parentId] as ICategory;
  delete parentCategory.childrenIds[categoryId];
  state.error = null;
  return state;
};

export const removeChildFromAllCategories: CaseReducer<
  ICategoriesState,
  PayloadAction<string>
> = (state, action) => {
  const childId = action.payload;
  const initialResult: Record<string, ICategory> = {};
  const categories = Object.keys(state.categories).reduce((result, key) => {
    const category = state.categories[key];
    if (category) {
      delete category.childrenIds[childId];
      result[key] = category;
    }
    return result;
  }, initialResult);
  state.categories = categories;
  state.error = null;
  return state;
};
