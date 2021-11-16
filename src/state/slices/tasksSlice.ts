import { createSlice } from '@reduxjs/toolkit';
import { ITasksState } from '../models/tasks-state';
import tasksReducers from '../reducers/tasks-reducers';

const initialState: ITasksState = {
  tasks: {},
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: tasksReducers,
});

export const tasksActions = tasksSlice.actions;
