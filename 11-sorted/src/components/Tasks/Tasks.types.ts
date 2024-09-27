export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'PENDING';
}
