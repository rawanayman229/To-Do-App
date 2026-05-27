import { createContext } from "react";

import type { Task, Status } from "../types/task";

export interface TaskContextType {
  tasks: Task[];

  addTask: (task: Task) => void;

  updateTask: (task: Task) => void;

  deleteTask: (id: string) => void;

  moveTask: (taskId: string, status: Status) => void;

  reorderTasks: (
  sourceIndex: number,
  destinationIndex: number,
  status: Status
) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);
