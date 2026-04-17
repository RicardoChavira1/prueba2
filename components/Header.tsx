'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, User, Package, Star } from 'lucide-react'; // Añadido Star

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Variable para el color principal basado en el logo de DONNI
  const brandGreen = "text-[#115e3b]";
  const brandGreenBg = "bg-[#115e3b]";

  return (
    // BLOQUE 1: Contenedor Principal
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 w-full border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">

        {/* BLOQUE 2: Logo y Marca */}
        <Link href="/" className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105">
          <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image
              src="/logo.jpeg"
              alt="Donni Logo"
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
          <h1 className={`text-2xl font-black tracking-tight font-sans ${brandGreen}`}>
            DONNI
          </h1>
        </Link>

        {/* BLOQUE 3: Navegación Desktop */}
        <nav className="hidden lg:flex items-center space-x-10 text-sm font-semibold tracking-wide text-slate-600">
          <Link href="/" className={`hover:${brandGreen} transition-colors duration-200`}>
            INICIO
          </Link>
          <Link href="/educacion-botanica" className={`hover:${brandGreen} transition-colors duration-200`}>
            EDUCACIÓN BOTÁNICA
          </Link>
          <Link href="/nosotros" className={`hover:${brandGreen} transition-colors duration-200`}>
            NOSOTROS
          </Link>

          {/* Comunidad - Próximamente */}
          <div className="flex items-center space-x-2 cursor-not-allowed group">
            <span className="text-slate-400 group-hover:text-slate-500 transition-colors">COMUNIDAD</span>
            <span className={`${brandGreenBg} text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm opacity-80`}>
              Próx
            </span>
          </div>
        </nav>

        {/* BLOQUE 4: Iconos de Acción */}
        <div className="flex items-center space-x-6">

          {/* Carrito */}
          <Link href="/carrito" className="relative p-2 text-slate-600 hover:text-[#115e3b] transition-colors duration-200 group">
            <ShoppingCart size={24} strokeWidth={1.5} />
            <div className={`absolute -top-1 -right-1 ${brandGreenBg} text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform`}>
              0
            </div>
          </Link>

          {/* Menú de Usuario Desplegable */}
          <div className="relative group hidden md:block">
            {/* Ícono base */}
            <div className="p-2 text-slate-600 hover:text-[#115e3b] cursor-pointer transition-colors duration-200">
              <User size={24} strokeWidth={1.5} />
            </div>

            {/* Caja desplegable (Se muestra al hacer hover) */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 flex flex-col overflow-hidden">
              <Link
                href="/mis-pedidos"
                className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#115e3b] transition-colors flex items-center"
              >
                <Package size={16} className="mr-2" /> Mis Pedidos
              </Link>

              {/* NUEVO: Opción de Membresías agregada al dropdown */}
              <Link
                href="/membresias"
                className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#115e3b] transition-colors flex items-center border-t border-slate-50"
              >
                <Star size={16} className="mr-2 text-[#D48960]" /> Membresías
              </Link>

              <div className="px-4 py-3 text-sm font-semibold text-slate-400 cursor-not-allowed border-t border-slate-50 flex items-center" title="Próximamente">
                <User size={16} className="mr-2" /> Mi Perfil (Próx)
              </div>
            </div>
          </div>

          {/* Botón Menú Móvil */}
          <button className="lg:hidden p-2 text-slate-600 hover:text-[#115e3b]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* BLOQUE 5: Menú Móvil Desplegable */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 p-6 space-y-6 shadow-inner animate-in slide-in-from-top-2">
          <Link href="/" className="block text-sm font-semibold text-slate-700 hover:text-[#115e3b]" onClick={() => setIsMenuOpen(false)}>INICIO</Link>
          <Link href="/educacion-botanica" className="block text-sm font-semibold text-slate-700 hover:text-[#115e3b]" onClick={() => setIsMenuOpen(false)}>EDUCACIÓN BOTÁNICA</Link>

          {/* Opciones del usuario en móvil */}
          <div className="pl-4 border-l-2 border-[#D48960] space-y-4 my-2">
            <Link href="/mis-pedidos" className="block text-sm font-semibold text-[#D48960] hover:text-[#c27a51] flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Package size={18} className="mr-2" /> MIS PEDIDOS
            </Link>
            {/* NUEVO: Opción de Membresías agregada al menú móvil */}
            <Link href="/membresias" className="block text-sm font-semibold text-[#D48960] hover:text-[#c27a51] flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Star size={18} className="mr-2" /> MEMBRESÍAS
            </Link>
          </div>

          <Link href="/nosotros" className="block text-sm font-semibold text-slate-700 hover:text-[#115e3b]" onClick={() => setIsMenuOpen(false)}>NOSOTROS</Link>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-sm font-semibold text-slate-400">COMUNIDAD</span>
            <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Próximamente</span>
          </div>
        </div>
      )}
    </header>
  );
}