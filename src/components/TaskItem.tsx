
import { useState } from 'react';
import { Task } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit, X, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, { title: editedTitle });
      setIsEditing(false);
    }
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group flex items-center justify-between gap-2 rounded-lg border p-3 shadow-sm transition-all',
        task.completed ? 'bg-muted/50' : 'bg-card hover:shadow-md'
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className={cn(
            'transition-all',
            task.completed ? 'opacity-100' : 'opacity-70'
          )}
        />
        
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        ) : (
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <span
              className={cn(
                'text-sm font-medium transition-all line-clamp-2',
                task.completed && 'line-through text-muted-foreground'
              )}
            >
              {task.title}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
              <span className="text-xs text-muted-foreground">{task.category}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <Button variant="ghost" size="icon" onClick={handleSave}>
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </motion.li>
  );
}