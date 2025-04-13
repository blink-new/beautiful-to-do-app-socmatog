
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilters } from './components/TaskFilters';
import { ThemeToggle } from './components/ThemeToggle';
import { CheckCircle2 } from 'lucide-react';

function App() {
  const {
    tasks,
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
  } = useTasks();

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-background z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-primary mb-4"
              >
                <CheckCircle2 size={64} />
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold"
                animate={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Focus Flow
              </motion.h1>
              <motion.p
                className="text-muted-foreground"
                animate={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Your beautiful productivity companion
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Focus Flow</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <TaskForm onAddTask={addTask} categories={getCategories()} />
        
        <TaskFilters
          taskFilter={taskFilter}
          setTaskFilter={setTaskFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={getCategories()}
          tasksCount={tasks.length}
          onClearCompleted={clearCompletedTasks}
        />
        
        <TaskList
          tasks={tasks}
          onToggle={toggleTaskCompletion}
          onDelete={deleteTask}
          onUpdate={updateTask}
          taskFilter={taskFilter}
          priorityFilter={priorityFilter}
        />
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>Focus Flow - Stay productive and organized</p>
        </div>
      </footer>
    </div>
  );
}

export default App;