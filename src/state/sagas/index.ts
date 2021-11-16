import { all, takeEvery } from 'redux-saga/effects';
import { categoriesActions } from '../slices/categoriesSlice';
import { tasksActions } from '../slices/tasksSlice';
import { createCategorySaga } from './createCategorySaga';
import { createTaskSaga } from './createTaskSaga';
import { deleteCategoryByIdSaga } from './deleteCategoryByIdSaga';
import { updateCategorySaga } from './updateCategorySaga';
import { updateTaskSaga } from './updateTaskSaga';

function* watchCreateCategorySaga() {
  yield takeEvery(categoriesActions.createCategory.type, createCategorySaga);
}

function* watchDeleteCategorySaga() {
  yield takeEvery(
    categoriesActions.deleteCategoryById.type,
    deleteCategoryByIdSaga
  );
}

function* watchCreateTaskSaga() {
  yield takeEvery(tasksActions.createTask.type, createTaskSaga);
}

function* watchUpdateCategorySaga() {
  yield takeEvery(categoriesActions.updateCategory.type, updateCategorySaga);
}

function* watchUpdateTaskSaga() {
  yield takeEvery(tasksActions.updateTask.type, updateTaskSaga);
}

export default function* rootSaga() {
  yield all([
    watchCreateCategorySaga(),
    watchUpdateCategorySaga(),
    watchDeleteCategorySaga(),
    watchCreateTaskSaga(),
    watchUpdateTaskSaga(),
  ]);
}
