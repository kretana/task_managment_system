export interface TaskComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}
export interface Task {
  id?: number;
  name: string;
  status: string;
  description: string;
  title: string;
  createdAt: Date;
  completedAt: Date;
  file: File;
  comment: TaskComment[];
  estimation: string;
  assignedTo: string;
}

export interface TasksState {
  tasks: Task[];
  selectedTask?: Task;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface TaskUpdate {
  id: number;
  status: string;
}
