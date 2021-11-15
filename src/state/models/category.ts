import { ICreateCategoryPayload } from './categories-state';

export interface ICategory {
  id: string;
  parentId: string | null;
  taskIds: Record<string, string>;
  childrenIds: Record<string, string>;
  title: string;
}

export class Category {
  static lastId = 0;

  private static generateId(): string {
    Category.lastId++;
    return String(Category.lastId);
  }

  static createCategory({
    parentId = null,
    title,
  }: ICreateCategoryPayload): ICategory {
    return {
      id: Category.generateId(),
      parentId,
      title,
      taskIds: {},
      childrenIds: {},
    };
  }

  static resetIdGenerator() {
    Category.lastId = 0;
  }
}
