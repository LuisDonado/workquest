import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { TaskProvider } from "@/context/TaskContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkQuest",
  description: "Plataforma de productividad gamificada",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <TaskProvider>
            {children}
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
