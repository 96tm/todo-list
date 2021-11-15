import { select, put } from 'redux-saga/effects';
import categoriesSelectors from '../selectors/categoriesSelectors';
import { categoriesActions } from '../slices/categoriesSlice';

export function* updateCategorySaga(
  action: ReturnType<typeof categoriesActions.updateCategory>
) {
  try {
    // will call API function in future
    const updatedCategory = action.payload;
    const categories: ReturnType<typeof categoriesSelectors.selectCategories> =
      yield select(categoriesSelectors.selectCategories);
    const categoryToUpdate = categories[updatedCategory.id];
    if (!categoryToUpdate) {
      yield put(categoriesActions.updateCategoryFailed('Category not found'));
    } else {
      yield put(categoriesActions.updateCategorySucceeded(action.payload));
    }
  } catch (err) {
    const { message } = err as Error;
    yield put(categoriesActions.updateCategoryFailed(message));
  }
}
