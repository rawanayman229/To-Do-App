export type Status = "todo" | "inprogress" | "done";

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  labels: string[];
  checklist: ChecklistItem[];
  status: Status;
}
