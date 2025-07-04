import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

// Definición del tipo Task
export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

// Obtener tareas de un usuario
export async function getTasksByUser(userId: string): Promise<Task[]> {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      title: data.title,
      description: data.description,
      completed: data.completed,
      createdAt: (data.createdAt?.toDate?.() || new Date()) as Date,
    };
  });
}

// Crear una nueva tarea
export async function createTask(task: Omit<Task, "id">): Promise<void> {
  await addDoc(collection(db, "tasks"), {
    ...task,
    createdAt: Timestamp.fromDate(task.createdAt || new Date()),
  });
}

// Marcar tarea como completada
export async function markTaskCompleted(taskId: string): Promise<void> {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, { completed: true });
}
