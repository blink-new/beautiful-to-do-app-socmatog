
import { AnimatePresence, motion } from 'framer-motion';
import { Task, TaskFilter, PriorityFilter } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  taskFilter: TaskFilter;
  priorityFilter: PriorityFilter;
}

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="rounded-full bg-muted p-4 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
            <path d="M8 12h8" />
          </svg>
        </div>
        <h3 className="text-lg font-medium">No tasks found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Add a new task or change your filters to see more tasks.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.ul
      layout
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}