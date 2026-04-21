'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, User, Package, Star, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../app/context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const brandGreen = "text-[#115e3b]";
  const brandGreenBg = "bg-[#115e3b]";

  // Cargar el contador del carrito desde localStorage
  useEffect(() => {
    const loadCartCount = () => {
      const saved = localStorage.getItem('donni-cart');
      if (saved) {
        try {
          const cart = JSON.parse(saved);
          setCartCount(cart.length);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    loadCartCount();
    setMounted(true);

    // Escuchar cambios en el carrito (desde otras pestañas o componentes)
    window.addEventListener('storage', loadCartCount);
    return () => window.removeEventListener('storage', loadCartCount);
  }, []);

  // Si no ha montado, renderizamos versión simplificada (evita errores de hidratación)
  if (!mounted) {
    return (
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 w-full border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse"></div>
            <h1 className={`text-2xl font-black tracking-tight font-sans ${brandGreen}`}>DONNI</h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 w-full border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">

        <Link href="/" className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105">
          <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image src="/logo.jpeg" alt="Donni Logo" fill className="object-contain" sizes="40px" priority />
          </div>
          <h1 className={`text-2xl font-black tracking-tight font-sans ${brandGreen}`}>DONNI</h1>
        </Link>

        <nav className="hidden lg:flex items-center space-x-10 text-sm font-semibold tracking-wide text-slate-600">
          <Link href="/" className={`hover:${brandGreen} transition-colors duration-200`}>INICIO</Link>
          <Link href="/marketplace" className={`hover:${brandGreen} transition-colors duration-200`}>MARKETPLACE</Link>
          <Link href="/educacion-botanica" className={`hover:${brandGreen} transition-colors duration-200`}>EDUCACIÓN BOTÁNICA</Link>
          <Link href="/nosotros" className={`hover:${brandGreen} transition-colors duration-200`}>NOSOTROS</Link>
          <div className="flex items-center space-x-2 cursor-not-allowed group">
            <span className="text-slate-400 group-hover:text-slate-500 transition-colors">COMUNIDAD</span>
            <span className={`${brandGreenBg} text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm opacity-80`}>Próx</span>
          </div>
        </nav>

        <div className="flex items-center space-x-6">
          {/* CARRITO CON CONTADOR REAL */}
          <Link href="/carrito" className="relative p-2 text-slate-600 hover:text-[#115e3b] transition-colors duration-200 group">
            <ShoppingCart size={24} strokeWidth={1.5} />
            {cartCount > 0 && (
              <div className={`absolute -top-1 -right-1 ${brandGreenBg} text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform`}>
                {cartCount}
              </div>
            )}
          </Link>

          {/* MENÚ DE USUARIO CONDICIONAL */}
          <div className="relative group hidden md:block">
            <div className="p-2 text-slate-600 hover:text-[#115e3b] cursor-pointer transition-colors duration-200 flex items-center gap-2">
              <User size={24} strokeWidth={1.5} />
              {user && <span className="text-xs font-bold truncate max-w-[80px]">{user.displayName || 'Usuario'}</span>}
            </div>

            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 flex flex-col overflow-hidden">
              {user ? (
                <>
                  <Link href="/mis-pedidos" className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#115e3b] transition-colors flex items-center">
                    <Package size={16} className="mr-3" /> Mis Pedidos
                  </Link>
                  <Link href="/membresias" className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#115e3b] transition-colors flex items-center border-t border-slate-50">
                    <Star size={16} className="mr-3 text-[#D48960]" /> Membresías
                  </Link>
                  <button onClick={logout} className="w-full text-left px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors flex items-center border-t border-slate-50">
                    <LogOut size={16} className="mr-3" /> Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <div className="p-4 bg-slate-50 border-b border-slate-100">
                    <p className="text-xs text-slate-500 mb-2 font-medium">Únete a nuestra comunidad botánica</p>
                    <Link href="/login" className="flex items-center justify-center w-full bg-[#115e3b] text-white py-2 rounded-xl text-sm font-bold hover:bg-[#0d4a2f] transition-colors">
                      <LogIn size={16} className="mr-2" /> Iniciar Sesión
                    </Link>
                  </div>
                  <Link href="/membresias" className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#115e3b] transition-colors flex items-center">
                    <Star size={16} className="mr-3 text-[#D48960]" /> Ver Membresías
                  </Link>
                </>
              )}
            </div>
          </div>

          <button className="lg:hidden p-2 text-slate-600 hover:text-[#115e3b]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Menú Móvil - puedes mantenerlo igual o agregar lógica condicional */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 p-6 space-y-6 shadow-inner">
          <Link href="/" className="block text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>INICIO</Link>
          <Link href="/marketplace" className="block text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>MARKETPLACE</Link>
          <Link href="/educacion-botanica" className="block text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>EDUCACIÓN BOTÁNICA</Link>
          <Link href="/nosotros" className="block text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>NOSOTROS</Link>
          {user ? (
            <>
              <Link href="/mis-pedidos" className="block text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>MIS PEDIDOS</Link>
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left py-2 text-red-500 font-bold text-sm">CERRAR SESIÓN</button>
            </>
          ) : (
            <Link href="/login" className="block w-full text-center bg-[#115e3b] text-white py-2 rounded-xl font-bold text-sm" onClick={() => setIsMenuOpen(false)}>INICIAR SESIÓN</Link>
          )}
        </div>
      )}
    </header>
  );
}