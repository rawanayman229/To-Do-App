import { useContext } from "react";

import { TaskContext } from "./TaskContextUtils";

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("TaskContext missing");
  }

  return context;
};
