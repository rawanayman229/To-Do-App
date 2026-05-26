import { Formik, Form, Field, ErrorMessage } from "formik";
import { X } from "lucide-react";
import { useTaskContext } from "../context/useTaskContext";
import type { Status } from "../types/task";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskForm = ({ isOpen, onClose }: TaskFormProps) => {
  const { addTask } = useTaskContext();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Task</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={{
            title: "",
            description: "",
            tags: "",
            status: "todo",
            checklistCount: "3",
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!values.title.trim()) {
              errors.title = "Task title is required";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            const checklistCountNum = parseInt(values.checklistCount, 10) || 0;

            const generatedChecklist = Array.from({
              length: checklistCountNum,
            }).map((_, i) => ({
              id: crypto.randomUUID(),
              text: `Subtask ${i + 1}`,
              completed: false,
            }));

            addTask({
              id: crypto.randomUUID(),
              title: values.title.trim(),
              description: values.description.trim(),
              labels: values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
              status: values.status as Status,
              checklist: generatedChecklist,
            });

            resetForm();
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form-fields">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <Field
                  id="title"
                  name="title"
                  placeholder="e.g., Design new landing page"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="form-error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  placeholder="Provide details about the task..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Labels (comma-separated)</label>
                <Field
                  id="tags"
                  name="tags"
                  placeholder="e.g., Urgent, Normal, Low"
                />
                <span className="input-tip">Separate tags with commas</span>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <Field id="status" as="select" name="status">
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                </Field>
              </div>

              <div className="form-group">
                <label htmlFor="checklistCount">
                  Subtasks Count (Checklist)
                </label>
                <Field
                  id="checklistCount"
                  name="checklistCount"
                  type="number"
                  min="0"
                  max="10"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  Create Task
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;
