export interface ITask {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  isFinished: boolean;
}

export class Task {
  static lastId = 0;

  private static generateId(): string {
    Task.lastId++;
    return String(Task.lastId);
  }

  static resetIdGenerator(): void {
    Task.lastId = 0;
  }

  static createTask({
    categoryId,
    title,
    description = '',
  }: ICreateTaskPayload): ITask {
    return {
      id: Task.generateId(),
      categoryId,
      title,
      description,
      isFinished: false,
    };
  }
}

export interface ICreateTaskPayload {
  categoryId: string;
  title: string;
  description?: string;
}
