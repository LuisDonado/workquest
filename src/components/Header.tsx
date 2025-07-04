'use client';

import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { auth } from '@/lib/firebase';

import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading || !user) return null; // No mostrar el header si no hay usuario

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center w-full z-10">
      <Link href="/dashboard" className="text-xl font-bold text-blue-600">
        🧭 WorkQuest
      </Link>
      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-700 hidden sm:inline">
          Bienvenido/a, <strong>{user.email}</strong>
        </span>
        <Link
          href="/dashboard"
          className="text-sm text-gray-700 hover:text-blue-600 transition"
        >
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
