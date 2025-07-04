'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getTasksByUser, markTaskCompleted } from '@/lib/task';

import { useAuth } from './AuthContext';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  marcarComoCompletada: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de un TaskProvider');
  }
  return context;
};

export function TaskProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!user) return;

    // ✅ mover la función aquí dentro para evitar dependencia
    const cargarTareas = async () => {
      const tareas = await getTasksByUser(user.uid);
      setTasks(tareas);
    };

    cargarTareas();
  }, [user]);

  const marcarComoCompletada = async (id: string) => {
    await markTaskCompleted(id);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, marcarComoCompletada }}>
      {children}
    </TaskContext.Provider>
  );
}
