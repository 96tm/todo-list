import { select, putResolve, put } from 'redux-saga/effects';
import { Category } from '../models/category';
import categoriesSelectors from '../selectors/categoriesSelectors';
import { categoriesActions } from '../slices/categoriesSlice';

export function* createCategorySaga(
  action: ReturnType<typeof categoriesActions.createCategory>
) {
  try {
    const { parentId = null, title } = action.payload;
    const newCategory = Category.createCategory({
      parentId: parentId || null,
      title,
    });
    const categories: ReturnType<typeof categoriesSelectors.selectCategories> =
      yield select(categoriesSelectors.selectCategories);
    if (parentId && categories[parentId]) {
      yield putResolve(
        categoriesActions.addChildToCategory({
          parentId,
          categoryId: newCategory.id,
        })
      );
    } else if (parentId && !categories[parentId]) {
      yield put(
        categoriesActions.createCategoryFailed(
          'Specified parent category not found'
        )
      );
      return;
    }
    yield putResolve(categoriesActions.createCategorySucceeded(newCategory));
  } catch (err) {
    const { message } = err as Error;
    yield put(categoriesActions.createCategoryFailed(message));
  }
}
