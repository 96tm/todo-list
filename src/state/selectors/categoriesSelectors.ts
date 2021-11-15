import { createSelector } from '@reduxjs/toolkit';
import { ICategoriesState } from '../models/categories-state';
import { RootState } from '../store';

const selectCategoriesState = (state: RootState): ICategoriesState =>
  state.categoriesState;

const selectCategories = createSelector(
  selectCategoriesState,
  (categoriesState) => categoriesState.categories
);

const selectLastAddedCategory = createSelector(
  selectCategoriesState,
  (categoriesState) => {
    const lastIndex = Math.max(
      ...Object.keys(categoriesState.categories).map((key) => parseInt(key, 10))
    );
    return categoriesState.categories[String(lastIndex)];
  }
);

const categoriesSelectors = {
  selectCategoriesState,
  selectCategories,
  selectLastAddedCategory,
};

export default categoriesSelectors;
