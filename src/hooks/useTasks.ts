
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskFilter, PriorityFilter } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: 'low' | 'medium' | 'high' = 'medium', category: string = 'General') => {
    if (!title.trim()) return;
    
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
      category,
    };
    
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const getCategories = () => {
    const categories = new Set(tasks.map(task => task.category));
    return Array.from(categories);
  };

  const filteredTasks = tasks
    .filter((task) => {
      // Filter by completion status
      if (taskFilter === 'active') return !task.completed;
      if (taskFilter === 'completed') return task.completed;
      return true;
    })
    .filter((task) => {
      // Filter by priority
      if (priorityFilter !== 'all') return task.priority === priorityFilter;
      return true;
    })
    .filter((task) => {
      // Filter by category
      if (categoryFilter !== 'all') return task.category === categoryFilter;
      return true;
    })
    .filter((task) => {
      // Filter by search query
      if (searchQuery) {
        return task.title.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });

  return {
    tasks: filteredTasks,
    addTask,
    toggleTaskCompletion,
    updateTask,
    deleteTask,
    clearCompletedTasks,
    taskFilter,
    setTaskFilter,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    getCategories,
  };
}