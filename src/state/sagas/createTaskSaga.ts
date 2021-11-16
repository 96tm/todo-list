import { select, put } from 'redux-saga/effects';
import { Task } from '../models/task';
import categoriesSelectors from '../selectors/categoriesSelectors';
import { categoriesActions } from '../slices/categoriesSlice';
import { tasksActions } from '../slices/tasksSlice';

export function* createTaskSaga(
  action: ReturnType<typeof tasksActions.createTask>
) {
  try {
    const { categoryId } = action.payload;
    const categories: ReturnType<typeof categoriesSelectors.selectCategories> =
      yield select(categoriesSelectors.selectCategories);
    const taskCategory = categories[categoryId];
    if (!taskCategory) {
      yield put(tasksActions.createTaskFailed('Task category not found'));
      return;
    }
    const newTask = Task.createTask(action.payload);
    yield put(tasksActions.createTaskSucceeded(newTask));
    yield put(
      categoriesActions.addTaskToCategory({
        categoryId: categoryId,
        taskId: newTask.id,
      })
    );
  } catch (err) {
    const { message } = err as Error;
    yield put(tasksActions.createTaskFailed(message));
  }
}
