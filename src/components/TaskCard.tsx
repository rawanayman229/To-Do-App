import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../types/task";
import { useTaskContext } from "../context/useTaskContext";
import { GripVertical, Trash2, Tag } from "lucide-react";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard = ({ task, index }: TaskCardProps) => {
  const { deleteTask } = useTaskContext();

  const getLabelColorClass = (label: string): string => {
    const normalized = label.toLowerCase().trim();
    if (normalized === "urgent") return "tag-red";
    if (normalized === "normal") return "tag-orange";
    if (normalized === "low") return "tag-teal";
    return "tag-default";
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="task-body">
            <div className="task-title-row">
              {/* DRAG HANDLE TRIGGER */}
              <div
                className="drag-handle"
                title="Drag to reorder"
                {...provided.dragHandleProps}
              >
                <GripVertical className="grip-svg" size={16} />
              </div>

              <h3 className="task-title">{task.title}</h3>

              <button
                onClick={() => deleteTask(task.id)}
                className="delete-task-btn"
                title="Delete Task"
              >
                <Trash2 className="trash-icon" size={15} />
              </button>
            </div>

            {task.description && (
              <p className="task-description">{task.description}</p>
            )}

            {task.labels && task.labels.length > 0 && (
              <div className="task-tags">
                {task.labels.map((tag) => (
                  <span
                    key={tag}
                    className={`task-tag ${getLabelColorClass(tag)}`}
                  >
                    <Tag className="tag-icon" size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

    
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
