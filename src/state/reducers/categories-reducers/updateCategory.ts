import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  ICategoriesState,
  UpdateCategoryPayload,
} from 'src/state/models/categories-state';

export const updateCategory: CaseReducer<
  ICategoriesState,
  PayloadAction<UpdateCategoryPayload>
> = (state) => {
  return state;
};

export const updateCategorySucceeded: CaseReducer<
  ICategoriesState,
  PayloadAction<UpdateCategoryPayload>
> = (state, action) => {
  const updatedCategory = action.payload;
  const { id } = updatedCategory;
  const { categories } = state;
  const categoryToUpdate = categories[id];
  Object.assign(categoryToUpdate, updatedCategory);
  state.error = null;
  return state;
};

export const updateCategoryFailed: CaseReducer<
  ICategoriesState,
  PayloadAction<string>
> = (state, action) => {
  state.error = action.payload;
  return state;
};
