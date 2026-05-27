import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { TaskContext } from "./TaskContextUtils";
import type { Task, Status } from "../types/task";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };
   const moveTask = (taskId: string, status: Status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

   const reorderTasks = (
    sourceIndex: number,
    destinationIndex: number,
    status: Status
  ) => {
    setTasks((prev) => {
      const columnTasks = prev.filter(
        (task) => task.status === status
      );

      const otherTasks = prev.filter(
        (task) => task.status !== status
      );

      const updated = [...columnTasks];

      const [removed] = updated.splice(sourceIndex, 1);

      updated.splice(destinationIndex, 0, removed);

      return [...otherTasks, ...updated];
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
