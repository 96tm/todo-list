import { createSelector } from '@reduxjs/toolkit';
import { ITasksState } from '../models/tasks-state';
import { RootState } from '../store';

const selectTasksState = (state: RootState): ITasksState => state.tasksState;

const selectTasks = createSelector(
  selectTasksState,
  (tasksState) => tasksState.tasks
);

const selectLastAddedTask = createSelector(selectTasksState, (tasksState) => {
  const lastIndex = Math.max(
    ...Object.keys(tasksState.tasks).map((key) => parseInt(key, 10))
  );
  return tasksState.tasks[String(lastIndex)];
});

const tasksSelectors = {
  selectTasksState,
  selectTasks,
  selectLastAddedTask,
};

export default tasksSelectors;
