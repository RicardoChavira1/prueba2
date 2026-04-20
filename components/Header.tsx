'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, User, Package, Star, LogOut, LogIn } from 'lucide-react';
import { auth } from '@/app/lib/firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0); // ← nuevo estado para el contador

  const brandGreen = "text-[#115e3b]";
  const brandGreenBg = "bg-[#115e3b]";

  // Cargar el carrito desde localStorage y escuchar cambios
  useEffect(() => {
    const loadCartCount = () => {
      const saved = localStorage.getItem('donni-cart');
      if (saved) {
        try {
          const cart = JSON.parse(saved);
          setCartCount(cart.length);
        } catch (e) {
          console.error("Error parsing cart", e);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    loadCartCount();
    window.addEventListener('storage', loadCartCount); // escucha cambios en otras pestañas
    return () => window.removeEventListener('storage', loadCartCount);
  }, []);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  if (!mounted) {
    return (
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 w-full border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse"></div>
            <h1 className={`text-2xl font-black tracking-tight ${brandGreen}`}>DONNI</h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 w-full border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">

        {/* Logo y Marca */}
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

        {/* Navegación Desktop */}
        <nav className="hidden lg:flex items-center space-x-10 text-sm font-semibold tracking-wide text-slate-600">
          <Link href="/" className={`hover:${brandGreen} transition-colors duration-200`}>INICIO</Link>
          <Link href="/educacion-botanica" className={`hover:${brandGreen} transition-colors duration-200`}>EDUCACIÓN BOTÁNICA</Link>
          <Link href="/nosotros" className={`hover:${brandGreen} transition-colors duration-200`}>NOSOTROS</Link>
        </nav>

        {/* Iconos de Acción */}
        <div className="flex items-center space-x-6">

          {/* Carrito con lógica de badge condicional */}
          <Link href="/carrito" className="relative p-2 text-slate-600 hover:text-[#115e3b] transition-colors duration-200 group">
            <ShoppingCart size={24} strokeWidth={1.5} />
            {cartCount > 0 && (
              <div className={`absolute -top-1 -right-1 ${brandGreenBg} text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform`}>
                {cartCount}
              </div>
            )}
          </Link>

          {/* MENÚ DE USUARIO DINÁMICO */}
          <div className="relative group hidden md:block">
            <div className="p-1 cursor-pointer transition-all duration-200">
              {user ? (
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#115e3b] hover:ring-4 ring-green-100 transition-all">
                  <img
                    src={user.photoURL || "/logo.jpeg"}
                    alt="Perfil"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="p-1 text-slate-600 hover:text-[#115e3b]">
                  <User size={24} strokeWidth={1.5} />
                </div>
              )}
            </div>

            {/* Caja desplegable */}
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 flex flex-col overflow-hidden">

              {user && (
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bienvenido</p>
                  <p className="text-sm font-black text-[#115e3b] truncate">{user.displayName?.split(' ')[0]}</p>
                </div>
              )}

              <Link href="/mis-pedidos" className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#115e3b] transition-colors flex items-center">
                <Package size={16} className="mr-2" /> Mis Pedidos
              </Link>

              <Link href="/membresias" className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#115e3b] transition-colors flex items-center border-t border-slate-50">
                <Star size={16} className="mr-2 text-[#D48960]" /> Membresías
              </Link>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center border-t border-slate-50"
                >
                  <LogOut size={16} className="mr-2" /> Cerrar Sesión
                </button>
              ) : (
                <Link
                  href="/login"
                  className={`px-4 py-3 text-sm font-bold text-white ${brandGreenBg} hover:opacity-90 transition-colors flex items-center justify-center`}
                >
                  <LogIn size={16} className="mr-2" /> Iniciar Sesión
                </Link>
              )}
            </div>
          </div>

          {/* Botón Menú Móvil */}
          <button className="lg:hidden p-2 text-slate-600 hover:text-[#115e3b]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 p-6 space-y-6 shadow-inner animate-in slide-in-from-top-2">
          {user && (
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#115e3b]">
                <img src={user.photoURL || "/logo.jpeg"} alt="Perfil" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">HOLA,</p>
                <p className="text-lg font-black text-[#115e3b] leading-tight">{user.displayName}</p>
              </div>
            </div>
          )}

          <Link href="/" className="block text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>INICIO</Link>
          <Link href="/educacion-botanica" className="block text-sm font-semibold text-slate-700" onClick={() => setIsMenuOpen(false)}>EDUCACIÓN BOTÁNICA</Link>
          <Link href="/mis-pedidos" className="block text-sm font-semibold text-[#D48960]" onClick={() => setIsMenuOpen(false)}>MIS PEDIDOS</Link>

          {user ? (
            <button onClick={handleLogout} className="w-full py-3 bg-red-50 text-red-500 font-bold rounded-xl text-sm">CERRAR SESIÓN</button>
          ) : (
            <Link href="/login" className={`block w-full py-3 ${brandGreenBg} text-white text-center font-bold rounded-xl text-sm`} onClick={() => setIsMenuOpen(false)}>INICIAR SESIÓN</Link>
          )}
        </div>
      )}
    </header>
  );
}