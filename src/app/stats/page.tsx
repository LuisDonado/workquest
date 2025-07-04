'use client';

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import Header from '@/components/Header';

import { useTasks } from '@/context/TaskContext';

const COLORS = ['#10B981', '#F59E0B']; // Verde y amarillo

export default function StatsPage() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const completadas = tasks.filter((t) => t.completed).length;
  const pendientes = total - completadas;

  const data = [
    { name: 'Completadas', value: completadas },
    { name: 'Pendientes', value: pendientes },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Estadísticas de Tareas</h1>

        <section className="w-full max-w-xl grid md:grid-cols-2 gap-6">
          {/* Gráfico de Barras */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center">Gráfico de Barras</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pastel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center">Gráfico de Pastel</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </>
  );
}
