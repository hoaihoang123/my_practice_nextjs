export interface Task {
  id: number;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  completed_date?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done" | "cancelled";
  assignee_id: number;
  project_id?: number;
  created_time: string;
  updated_time: string;
}
