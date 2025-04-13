
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  category: string;
}

export type TaskFilter = 'all' | 'active' | 'completed';
export type PriorityFilter = 'all' | 'low' | 'medium' | 'high';