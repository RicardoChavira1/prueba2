'use client';

import React, { useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-[#1a401f] shadow-sm sticky top-0 z-50 w-full border-b border-slate-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* 3.5: Formato al LOGO con colores originales y centrado perfecto */}
        <a href="/" className="flex items-center space-x-3 group cursor-pointer border-2 border-[#1a401f] px-3 py-1 rounded-lg hover:bg-slate-50 transition-all">
          {/* Contenedor circular con fondo blanco para que el logo resalte */}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
            <img 
              src="/logo.jpeg" 
              alt="Donni Logo" 
              className="w-full h-full object-cover scale-90" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }} 
            />
            {/* Respaldo en caso de error de carga */}
            <span className="text-xl hidden">🌿</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tighter font-serif text-[#1a401f]">DONNI</h1>
        </a>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-extrabold uppercase tracking-[0.2em]">
          <a href="/" className="hover:text-[#D48960] transition-colors">Inicio</a>
          <a href="/nosotros" className="hover:text-[#D48960] transition-colors">Nosotros</a>
          <a href="/educacion-botanica" className="hover:text-[#D48960] transition-colors">Educación Botánica</a>
          
          <div className="relative group cursor-help">
            <span className="text-slate-300">Comunidad</span>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-[#D48960] text-white text-[9px] px-2 py-1 rounded whitespace-nowrap shadow-lg items-center justify-center z-[60]">
              PRÓXIMAMENTE
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-[#D48960]"></div>
            </div>
          </div>
        </nav>

        {/* ACCIONES */}
        <div className="flex items-center space-x-4">
          <a href="/carrito" className="relative p-2 hover:bg-slate-50 rounded-full transition-all">
            <ShoppingCart size={22} className="text-[#1a401f]" />
            <div className="absolute -top-1 -right-1 bg-[#D48960] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              0
            </div>
          </a>
          <User size={22} className="text-[#1a401f] cursor-pointer hidden md:block" />
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 p-6 space-y-6 font-bold uppercase text-xs tracking-widest">
          <a href="/" className="block">Inicio</a>
          <a href="/nosotros" className="block">Nosotros</a>
          <a href="/educacion-botanica" className="block text-[#D48960]">Educación Botánica</a>
          <span className="block text-slate-300 italic">Comunidad (Próximamente)</span>
        </div>
      )}
    </header>
  );
}