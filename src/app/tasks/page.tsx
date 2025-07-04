import Header from '@/components/Header';

import TaskList from './TaskList';

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mis Tareas</h1>
        <Header />
        <TaskList />
      </div>
    </main>
  );
}
