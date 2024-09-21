export interface Task {
  id: number;
  title: string;
  description: string;
  assignedToUser?: string;
  status?: string;
  dueDate?: Date | string;
  priority?: string;
}
