import { createSlice } from '@reduxjs/toolkit';
import { ICategoriesState } from '../models/categories-state';
import categoriesReducers from '../reducers/categories-reducers';

const initialState: ICategoriesState = { categories: {}, error: null };

export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: categoriesReducers,
});

export const categoriesActions = categoriesSlice.actions;
