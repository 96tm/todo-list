import { select, put, putResolve } from 'redux-saga/effects';
import categoriesSelectors from '../selectors/categoriesSelectors';
import { categoriesActions } from '../slices/categoriesSlice';
import { tasksActions } from '../slices/tasksSlice';

export function* deleteCategoryByIdSaga(
  action: ReturnType<typeof categoriesActions.deleteCategoryById>
) {
  try {
    const categoryId = action.payload;
    const categories: ReturnType<typeof categoriesSelectors.selectCategories> =
      yield select(categoriesSelectors.selectCategories);
    const categoryToDelete = categories[categoryId];
    if (!categoryToDelete) {
      yield put(
        categoriesActions.deleteCategoryByIdFailed('Category not found')
      );
      return;
    }
    const { parentId } = categoryToDelete;
    if (parentId) {
      yield putResolve(
        categoriesActions.removeChildFromCategory({
          parentId,
          categoryId: categoryId,
        })
      );
    }
    yield putResolve(categoriesActions.removeCategoryChildren(categoryId));
    yield putResolve(tasksActions.removeAllTasksByCategoryId(categoryId));
    yield putResolve(
      categoriesActions.deleteCategoryByIdSucceeded(action.payload)
    );
  } catch (err) {
    const { message } = err as Error;
    yield put(categoriesActions.deleteCategoryByIdFailed(message));
  }
}
