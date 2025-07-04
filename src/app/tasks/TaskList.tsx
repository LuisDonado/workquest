'use client';

import { useTasks } from '@/context/TaskContext';

export default function TaskList() {
  const { tasks, marcarComoCompletada } = useTasks();

  const total = tasks.length;
  const completadas = tasks.filter((t) => t.completed).length;
  const pendientes = total - completadas;

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Resumen</h3>
        <p className="text-sm text-gray-600">
          Total tareas: <strong>{total}</strong> | Completadas:{' '}
          <strong className="text-green-600">{completadas}</strong> |
          Pendientes:{' '}
          <strong className="text-yellow-600">{pendientes}</strong>
        </p>
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 border rounded-lg shadow-sm transition ${task.completed ? 'bg-green-100' : 'bg-white'
            }`}
        >
          <h2 className="text-lg font-bold text-gray-800">{task.title}</h2>
          <p className="text-sm text-gray-600">{task.description}</p>

          <p className="mt-2 text-sm font-medium">
            Estado:{' '}
            <span
              className={task.completed ? 'text-green-700' : 'text-yellow-600'}
            >
              {task.completed ? 'Completada' : 'Pendiente'}
            </span>
          </p>

          {!task.completed && (
            <button
              onClick={() => marcarComoCompletada(task.id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Marcar como completada
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
