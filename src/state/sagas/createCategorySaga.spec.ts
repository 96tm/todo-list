import { putResolve } from 'redux-saga/effects';
import { Category, ICategory } from '../models/category';
import { categoriesActions } from '../slices/categoriesSlice';
import { createCategorySaga } from './createCategorySaga';

describe('createCategorySage tests', () => {
  beforeEach(() => {
    Category.resetIdGenerator();
  });

  test('Should create two categories without a parent', () => {
    const taskTitle = 'Category without a parent';

    const generator = createCategorySaga(
      categoriesActions.createCategory({ title: taskTitle })
    );
    generator.next();
    const newCategory: ICategory = {
      id: '1',
      title: taskTitle,
      parentId: null,
      childrenIds: {},
      taskIds: {},
    };
    expect(generator.next().value).toEqual(
      putResolve(categoriesActions.createCategorySucceeded(newCategory))
    );
  });
  test('Should create a category with a parent', () => {
    const categories: Record<string, ICategory> = {
      1: {
        id: '1',
        title: 'parent',
        parentId: null,
        childrenIds: {},
        taskIds: {},
      },
    };
    const childCategory: ICategory = {
      id: '2',
      title: 'child',
      parentId: '1',
      childrenIds: {},
      taskIds: {},
    };

    const generatorParent = createCategorySaga(
      categoriesActions.createCategory({ title: 'parent' })
    );
    const generatorChild = createCategorySaga(
      categoriesActions.createCategory({ title: 'child', parentId: '1' })
    );

    generatorParent.next(categories);
    generatorParent.next(categories);
    generatorChild.next(categories);

    expect(generatorChild.next(categories).value).toEqual(
      putResolve(
        categoriesActions.addChildToCategory({ parentId: '1', categoryId: '2' })
      )
    );
    expect(generatorChild.next(categories).value).toEqual(
      putResolve(categoriesActions.createCategorySucceeded(childCategory))
    );
  });
});
