'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { auth } from '@/lib/firebase';

export default function HomePage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState(''); // oculto pero necesario
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password || 'usuario123');
      router.push('/dashboard');
    } catch (err) {
      setError('No se pudo crear el usuario. Verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Columna izquierda: Información */}
      <div className="w-full md:w-1/2 p-10 space-y-8 bg-white">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Sistema de gestión de <span className="text-blue-600">tareas gamificadas</span>
        </h1>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">
              🎯 Logros y progreso en tiempo real
            </h3>
            <p className="text-gray-600 text-sm">
              Recibe informes automáticos con tu evolución semanal.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">
              ⚙️ Tareas dinámicas y medibles
            </h3>
            <p className="text-gray-600 text-sm">
              Interactúa con misiones que se adaptan a tus metas personales y laborales.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">
              🔗 Integraciones
            </h3>
            <p className="text-gray-600 text-sm">
              Compatible con herramientas de productividad y equipos remotos.
            </p>
          </div>
        </div>
      </div>

      {/* Columna derecha: Formulario */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-10">
        <form
          onSubmit={handleRegister}
          className="bg-white w-full max-w-md shadow-lg rounded-lg p-8 space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">
            Prueba WorkQuest gratis <br /> durante 14 días
          </h2>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-1/2 border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-1/2 border rounded p-2"
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email de negocios"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="w-full border rounded p-2"
          />
          <input
            type="tel"
            placeholder="Número de teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border rounded p-2"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'REGÍSTRESE GRATIS'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            Al registrarme, acepto los{' '}
            <span className="underline cursor-pointer">Términos y condiciones</span> y la{' '}
            <span className="underline cursor-pointer">Política de privacidad</span>.
          </p>
        </form>
      </div>
    </main>
  );
}
