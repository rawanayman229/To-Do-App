import { Droppable } from "@hello-pangea/dnd";
import type { Task } from "../types/task";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  tasks: Task[];
  type: string;
}

const Column = ({ title, tasks, type }: ColumnProps) => {
  return (
    // Column Box
    <div className="column">
      <div className={`column-header header-${type}`}>
        <span className="column-title">{title}</span>
        <span className="column-count">({tasks.length})</span>
      </div>

      {/* Droppable Container */}
      <Droppable droppableId={type}>
        {(provided, snapshot) => (
          <div
            className={`column-cards ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Mapping Tasks */}
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}

            {tasks.length === 0 && (
              <div className="empty-column-placeholder">
                <span>No tasks here</span>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
