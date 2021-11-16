import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  IAddChildToCategoryPayload,
  ICategoriesState,
  ICreateCategoryPayload,
} from 'src/state/models/categories-state';
import { ICategory } from 'src/state/models/category';

export const createCategory: CaseReducer<
  ICategoriesState,
  PayloadAction<ICreateCategoryPayload>
> = (state) => {
  return state;
};

export const createCategorySucceeded: CaseReducer<
  ICategoriesState,
  PayloadAction<ICategory>
> = (state, action) => {
  const { id: categoryId } = action.payload;
  state.error = null;
  state.categories[categoryId] = action.payload;
  return state;
};

export const createCategoryFailed: CaseReducer<
  ICategoriesState,
  PayloadAction<string>
> = (state, action) => {
  state.error = action.payload;
  return state;
};

export const addChildToCategory: CaseReducer<
  ICategoriesState,
  PayloadAction<IAddChildToCategoryPayload>
> = (state, action) => {
  const { parentId, categoryId } = action.payload;
  const { categories } = state;
  const parentCategory = categories[parentId] as ICategory;
  parentCategory.childrenIds[categoryId] = categoryId;
  state.error = null;
  return state;
};
