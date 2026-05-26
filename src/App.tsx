import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";

import type { Status } from "./types/task";

import Column from "./components/Column";
import Filters from "./components/Filters";
import TaskForm from "./components/TaskForm";

import { TaskProvider } from "./context/TaskContext";
import { useTaskContext } from "./context/useTaskContext";

import "./styles/app.scss";

const Board = () => {
  const { tasks, moveTask } = useTaskContext();

  const [search, setSearch] = useState("");
  const [label, setLabel] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const title = task.title ?? "";
    const description = task.description ?? "";

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase());

    const matchesLabel = label
      ? task.labels?.some((l) => l.toLowerCase() === label.toLowerCase())
      : true;

    return matchesSearch && matchesLabel;
  });

  const isStatus = (value: string): value is Status => {
    return value === "todo" || value === "inprogress" || value === "done";
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const destId = result.destination.droppableId;
    if (!isStatus(destId)) return;
    moveTask(result.draggableId, destId);
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header-bar">
        <h1 className="board-title">To Do List App</h1>
        <button className="new-task-btn" onClick={() => setIsFormOpen(true)}>
          <Plus size={16} className="plus-icon" />
          New Task
        </button>
      </header>

      {/* SEARCH AND FILTERS */}
      <section className="controls-section">
        <Filters
          search={search}
          setSearch={setSearch}
          label={label}
          setLabel={setLabel}
        />
      </section>

      {/* BOARD GRID */}
      <main className="board-content">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board-grid">
            <Column
              title="To Do"
              type="todo"
              tasks={filteredTasks.filter((t) => t.status === "todo")}
            />

            <Column
              title="In Progress"
              type="inprogress"
              tasks={filteredTasks.filter((t) => t.status === "inprogress")}
            />

            <Column
              title="Done"
              type="done"
              tasks={filteredTasks.filter((t) => t.status === "done")}
            />
          </div>
        </DragDropContext>
      </main>

      {/* FORM MODAL */}
      {isFormOpen && (
        <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </div>
  );
};

function App() {
  return (
    <TaskProvider>
      <Board />
    </TaskProvider>
  );
}

export default App;
