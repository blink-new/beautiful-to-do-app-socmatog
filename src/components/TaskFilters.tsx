
import { Search, X } from 'lucide-react';
import { TaskFilter, PriorityFilter } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '../lib/utils';

interface TaskFiltersProps {
  taskFilter: TaskFilter;
  setTaskFilter: (filter: TaskFilter) => void;
  priorityFilter: PriorityFilter;
  setPriorityFilter: (filter: PriorityFilter) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  tasksCount: number;
  onClearCompleted: () => void;
}

export function TaskFilters({
  taskFilter,
  setTaskFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery,
  categories,
  tasksCount,
  onClearCompleted,
}: TaskFiltersProps) {
  const filterButtons: { label: string; value: TaskFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as PriorityFilter)}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex gap-1">
          {filterButtons.map((filter) => (
            <Button
              key={filter.value}
              variant={taskFilter === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTaskFilter(filter.value)}
              className={cn(
                'transition-all',
                taskFilter === filter.value ? 'shadow-sm' : ''
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {tasksCount} {tasksCount === 1 ? 'task' : 'tasks'} found
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCompleted}
            className="text-destructive hover:text-destructive"
          >
            Clear completed
          </Button>
        </div>
      </div>
    </div>
  );
}