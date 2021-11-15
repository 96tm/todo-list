import { select, put, putResolve } from 'redux-saga/effects';
import categoriesSelectors from '../selectors/categoriesSelectors';
import tasksSelectors from '../selectors/tasksSelectors';
import { categoriesActions } from '../slices/categoriesSlice';
import { tasksActions } from '../slices/tasksSlice';

export function* updateTaskSaga(
  action: ReturnType<typeof tasksActions.updateTask>
) {
  try {
    const updatedTask = action.payload;
    const { categoryId: newCategoryId, id: taskId } = updatedTask;
    const tasks: ReturnType<typeof tasksSelectors.selectTasks> = yield select(
      tasksSelectors.selectTasks
    );
    const taskToUpdate = tasks[taskId];
    if (!taskToUpdate) {
      yield put(tasksActions.updateTaskFailed('Task not found'));
      return;
    }
    const categories: ReturnType<typeof categoriesSelectors.selectCategories> =
      yield select(categoriesSelectors.selectCategories);
    if (newCategoryId && !categories[newCategoryId]) {
      yield put(
        tasksActions.updateTaskFailed('Specified parent category not found')
      );
      return;
    } else if (newCategoryId && categories[newCategoryId]) {
      yield putResolve(
        categoriesActions.removeTaskFromCategory({
          categoryId: taskToUpdate.categoryId,
          taskId,
        })
      );
      yield putResolve(
        categoriesActions.addTaskToCategory({
          categoryId: newCategoryId,
          taskId: taskId,
        })
      );
    }
    yield putResolve(tasksActions.updateTaskSucceeded(action.payload));
  } catch (err) {
    const { message } = err as Error;
    yield put(tasksActions.updateTaskFailed(message));
  }
}
