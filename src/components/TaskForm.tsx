
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '../lib/utils';

interface TaskFormProps {
  onAddTask: (title: string, priority: 'low' | 'medium' | 'high', category: string) => void;
  categories: string[];
}

export function TaskForm({ onAddTask, categories }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('General');
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title, priority, category);
      setTitle('');
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategory(newCategory);
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4 mb-6"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
          autoFocus
        />
        <div className="flex gap-2">
          <Select value={priority} onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high')}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          {isAddingCategory ? (
            <div className="flex gap-1">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                className="w-[140px]"
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <Button type="button" variant="outline" onClick={handleAddCategory}>
                Add
              </Button>
            </div>
          ) : (
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                {categories.map((cat) => (
                  cat !== 'General' && <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
                <SelectItem value="__new__" className="text-primary font-medium">
                  + New Category
                </SelectItem>
              </SelectContent>
            </Select>
          )}

          <Button 
            type="submit" 
            className={cn(
              "transition-all",
              !title.trim() && "opacity-70"
            )}
            disabled={!title.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </motion.form>
  );
}