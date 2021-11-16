import { ITask } from './task';

export interface ITasksState {
  tasks: Record<string, ITask>;
  error: string | null;
}

export type UpdateTaskPayload = Partial<ITask> & Pick<ITask, 'id'>;
