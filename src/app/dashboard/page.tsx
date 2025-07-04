'use client';

import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { auth } from '@/lib/firebase';

import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Bienvenido a WorkQuest</h1>
        <p className="mb-6">
          Estás autenticado como: <strong>{user?.email}</strong>
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <Link
            href="/tasks"
            className="block bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Ver tareas
          </Link>
          <Link
            href="/profile"
            className="block bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Perfil
          </Link>
          <Link
            href="/stats"
            className="block bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            Estadísticas
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
