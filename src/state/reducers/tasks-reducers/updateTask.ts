import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ITasksState, UpdateTaskPayload } from 'src/state/models/tasks-state';

export const updateTask: CaseReducer<
  ITasksState,
  PayloadAction<UpdateTaskPayload>
> = (state): ITasksState => {
  return state;
};

export const updateTaskSucceeded: CaseReducer<
  ITasksState,
  PayloadAction<UpdateTaskPayload>
> = (state, action): ITasksState => {
  const updatedTask = action.payload;
  const { tasks } = state;
  const taskToUpdate = tasks[updatedTask.id];
  Object.assign(taskToUpdate, updatedTask);
  state.error = null;
  return state;
};

export const updateTaskFailed: CaseReducer<
  ITasksState,
  PayloadAction<string>
> = (state, action): ITasksState => {
  state.error = action.payload;
  return state;
};
