import { ICategory } from './category';

export interface ICategoriesState {
  categories: Record<string, ICategory>;
  error: string | null;
}

export interface IAddChildToCategoryPayload {
  parentId: string;
  categoryId: string;
}

export type RemoveChildFromCategoryPayload = IAddChildToCategoryPayload;

export interface ICreateCategoryPayload {
  parentId?: string | null;
  title: string;
}

export interface IAddTaskToCategoryPayload {
  categoryId: string;
  taskId: string;
}

export type RemoveTaskFromCategoryPayload = IAddTaskToCategoryPayload;

export type UpdateCategoryPayload = Omit<
  Partial<ICategory> & Pick<ICategory, 'id'>,
  'childrenIds' | 'parentId' | 'taskIds'
>;
