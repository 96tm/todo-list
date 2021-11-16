import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICreateTaskPayload, ITask } from 'src/state/models/task';
import { ITasksState } from 'src/state/models/tasks-state';

export const createTask: CaseReducer<
  ITasksState,
  PayloadAction<ICreateTaskPayload>
> = (state): ITasksState => {
  return state;
};

export const createTaskSucceeded: CaseReducer<
  ITasksState,
  PayloadAction<ITask>
> = (state, action): ITasksState => {
  const newTask = action.payload;
  state.error = null;
  state.tasks[newTask.id] = newTask;
  return state;
};

export const createTaskFailed: CaseReducer<
  ITasksState,
  PayloadAction<string>
> = (state, action): ITasksState => {
  state.error = action.payload;
  return state;
};
