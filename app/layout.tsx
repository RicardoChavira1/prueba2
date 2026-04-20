import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "./context/AuthContext";

// --- RESTAURAMOS LA CONFIGURACIÓN DE FUENTES ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DONNI Botanics",
  description: "Plataforma de e-commerce y educación botánica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>

        {/* ENVOLVEMOS TODO EN EL AUTH PROVIDER PARA EL ESTADO GLOBAL */}
        <AuthProvider>
          <TopBar />
          <Header />

          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </AuthProvider>

      </body>
    </html>
  );
}