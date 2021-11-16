import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../models/task';
import { ITasksState } from '../../models/tasks-state';
import {
  createTask,
  createTaskFailed,
  createTaskSucceeded,
} from './createTask';
import {
  updateTask,
  updateTaskFailed,
  updateTaskSucceeded,
} from './updateTask';

const removeAllTasksByCategoryId: CaseReducer<
  ITasksState,
  PayloadAction<string>
> = (state, action) => {
  const { tasks: initialTasks } = state;
  const initialResult: Record<string, ITask> = {};
  const categoryId = action.payload;
  const tasks = Object.keys(initialTasks).reduce((result, key) => {
    const task = initialTasks[key];
    if (task && task.categoryId !== categoryId) {
      result[key] = task;
    }
    return result;
  }, initialResult);
  state.error = null;
  state.tasks = tasks;
  return state;
};

const tasksReducers = {
  createTask,
  createTaskFailed,
  createTaskSucceeded,
  updateTask,
  updateTaskFailed,
  updateTaskSucceeded,
  removeAllTasksByCategoryId,
};

export default tasksReducers;
