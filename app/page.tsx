'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Droplets, 
  Bug, 
  Sun, 
  CheckCircle, 
  ArrowRight,
  ChevronRight,
  Package, 
  ShieldCheck,
  Truck
} from 'lucide-react';

// --- INTERFACES PARA PERSISTENCIA ---
interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
    instanceId: number;
}

// --- DATOS DE PLANTAS (URLs Estables y Categorizadas) ---
const PLANTAS_DATA = [
    { 
        id: 1, 
        nombre: "Monstera Deliciosa", 
        precio: 450, 
        cuidado: "Riego Moderado", 
        categoria: "Interior", 
        imagen: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        id: 2, 
        nombre: "Sansevieria Trifasciata", 
        precio: 280, 
        cuidado: "Poca Luz/Agua", 
        categoria: "Resistente", 
        imagen: "https://images.unsplash.com/photo-1593433561991-325519804035?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        id: 3, 
        nombre: "Poto (Epipremnum)", 
        precio: 190, 
        cuidado: "Fácil Cuidado", 
        categoria: "Colgante", 
        imagen: "https://images.unsplash.com/photo-1597055181300-e3633a207519?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        id: 4, 
        nombre: "Suculenta Echeveria", 
        precio: 120, 
        cuidado: "Luz Directa", 
        categoria: "Exterior", 
        imagen: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=800&auto=format&fit=crop" 
    },
];

// --- COMPONENTES ATÓMICOS ---

const IconoContenedor = ({ children, className = '', onClick = () => {} }: any) => (
    <div 
        onClick={onClick}
        className={`p-2 rounded-full cursor-pointer transition-all duration-200 active:scale-95 ${className}`}
    >
        {children}
    </div>
);

const Badge = ({ count }: { count: number }) => (
    <div className="absolute -top-1 -right-1 bg-[#D48960] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1a401f]">
        {count}
    </div>
);

// --- COMPONENTE PRINCIPAL (HOME) ---

export default function App() {
    // Estados Globales
    const [carrito, setCarrito] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notificacion, setNotificacion] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    
    // Estado para el filtro del Marketplace en Home
    const [categoriaActiva, setCategoriaActiva] = useState('Todos');

    // --- LÓGICA DE PERSISTENCIA (SIN FIREBASE) ---
    useEffect(() => {
        setIsMounted(true);
        const carritoGuardado = localStorage.getItem('donni-cart');
        if (carritoGuardado) {
            try {
                setCarrito(JSON.parse(carritoGuardado));
            } catch (e) {
                console.error("Error al cargar el carrito");
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('donni-cart', JSON.stringify(carrito));
        }
    }, [carrito, isMounted]);

    // Lógica de filtrado para la sección de productos
    const plantasFiltradas = useMemo(() => {
        const base = categoriaActiva === 'Todos' 
            ? PLANTAS_DATA 
            : PLANTAS_DATA.filter(p => p.categoria === categoriaActiva);
            
        return base.filter(p => 
            p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [categoriaActiva, searchQuery]);

    // Lógica de Carrito
    const agregarAlCarrito = (planta: any) => {
        const nuevoItem: CartItem = { 
            ...planta, 
            instanceId: Date.now() + Math.random() 
        };
        setCarrito(prev => [...prev, nuevoItem]);
        mostrarNotificacion(`¡${planta.nombre} añadido al carrito!`);
    };

    const mostrarNotificacion = (msj: string) => {
        setNotificacion(msj);
        setTimeout(() => setNotificacion(null), 3000);
    };

    // Prevenir error de hidratación
    if (!isMounted) return null;

    return (
        <div className="min-h-screen font-sans text-slate-800 bg-white selection:bg-[#D48960]/30">
            
            {/* Notificación Flotante */}
            {notificacion && (
                <div className="fixed bottom-8 right-8 z-[100] bg-[#1a401f] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce">
                    <CheckCircle size={20} className="text-[#D48960]" />
                    <span className="font-medium">{notificacion}</span>
                </div>
            )}
            
            {/* HEADER 
            <header className="bg-[#1a401f] text-white shadow-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    
                    {/* Logo 
                    <a href="/" className="flex items-center space-x-3 group cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                            <img src="/logo.jpeg" alt="D" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            <span className="text-xl font-bold">D</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tighter font-serif">DONNI</h1>
                    </a>

                    {/* Navegación Desktop 
                    <nav className="hidden lg:flex space-x-10 text-sm font-semibold uppercase tracking-widest">
                        <a href="/marketplace" className="hover:text-[#D48960] transition-colors">Marketplace</a>
                        <a href="/academia" className="hover:text-[#D48960] transition-colors">Academia</a>
                        <a href="#garantia" className="hover:text-[#D48960] transition-colors">Logística</a>
                        <a href="#comunidad" className="hover:text-[#D48960] transition-colors">Comunidad</a>
                    </nav>

                    {/* Acciones 
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 border border-white/10 focus-within:bg-white/20 transition-all">
                            <Search size={18} className="text-white/60 mr-2" />
                            <input 
                                type="text" 
                                placeholder="Buscar planta..." 
                                className="bg-transparent border-none outline-none text-sm placeholder:text-white/40 w-32 focus:w-48 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        
                        <a href="/carrito" className="relative">
                            <IconoContenedor className="hover:bg-white/10">
                                <ShoppingCart size={24} />
                            </IconoContenedor>
                            {carrito.length > 0 && <Badge count={carrito.length} />}
                        </a>

                        <IconoContenedor className="hover:bg-white/10 hidden md:flex">
                            <User size={24} />
                        </IconoContenedor>

                        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu 
                {isMenuOpen && (
                    <div className="lg:hidden bg-[#1a401f] border-t border-white/10 p-6 space-y-4">
                        <nav className="flex flex-col space-y-4 font-bold text-lg">
                            <a href="/marketplace" onClick={() => setIsMenuOpen(false)}>Marketplace</a>
                            <a href="/academia" onClick={() => setIsMenuOpen(false)}>Academia</a>
                            <a href="#garantia" onClick={() => setIsMenuOpen(false)}>Garantía</a>
                            <a href="#comunidad" onClick={() => setIsMenuOpen(false)}>Comunidad</a>
                            <a href="/carrito" onClick={() => setIsMenuOpen(false)}>Mi Carrito ({carrito.length})</a>
                        </nav>
                    </div>
                )}
            </header>*/}

            <main className="container mx-auto px-4 py-8 md:py-16">
                
                {/* HERO SECTION */}
                <section className="relative overflow-hidden bg-slate-50 rounded-[2.5rem] p-8 md:p-20 mb-20 border border-slate-100 flex flex-col items-center text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a401f]/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D48960]/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>
                    
                    <span className="bg-[#1a401f]/10 text-[#1a401f] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        Impulsando tu Éxito Botánico
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-[#1a401f] leading-tight mb-6 max-w-4xl">
                        Naturaleza con <span className="text-[#D48960]">Conocimiento</span> Real.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
                        No solo vendemos plantas, entregamos la confianza de verlas crecer. Soporte experto 24/7 y guías personalizadas en cada envío.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href="/marketplace" className="bg-[#1a401f] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-[#265c2c] transition-all shadow-lg shadow-[#1a401f]/20">
                            Explorar Catálogo <ArrowRight size={18} className="ml-2" />
                        </a>
                        <a href="/academia" className="bg-white text-[#1a401f] border-2 border-[#1a401f]/10 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all text-center">
                            Ver Academia
                        </a>
                    </div>
                </section>

                {/* MARKETPLACE SECTION (Con Filtros Corregidos) */}
                <section id="marketplace" className="mb-24">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-[#1a401f]">Marketplace Consciente</h2>
                            <p className="text-slate-400 mt-2 font-medium italic">Especies seleccionadas para cada tipo de hogar</p>
                        </div>
                        {/* BOTONES DE FILTRO FUNCIONALES */}
                        <div className="w-full md:w-auto flex items-center space-x-2 overflow-x-auto pb-2">
                            {['Todos', 'Interior', 'Resistente', 'Exterior', 'Colgante'].map(cat => (
                                <button 
                                    key={cat} 
                                    onClick={() => setCategoriaActiva(cat)}
                                    className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all whitespace-nowrap ${
                                        categoriaActiva === cat 
                                        ? 'bg-[#1a401f] text-white border-[#1a401f]' 
                                        : 'bg-white text-slate-400 border-slate-200 hover:border-[#1a401f] hover:text-[#1a401f]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {plantasFiltradas.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {plantasFiltradas.map(planta => (
                                <div key={planta.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        <img 
                                            src={planta.imagen} 
                                            alt={planta.nombre} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=800&auto=format&fit=crop"; }}
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-[#1a401f]">
                                            {planta.categoria}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1a401f] group-hover:text-[#D48960] transition-colors">{planta.nombre}</h3>
                                            <p className="text-slate-400 text-sm mt-1 flex items-center">
                                                <Droplets size={14} className="mr-1 text-blue-400" /> {planta.cuidado}
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-2xl font-black text-[#1a401f] tracking-tighter">${planta.precio}</span>
                                            <button 
                                                onClick={() => agregarAlCarrito(planta)}
                                                className="bg-[#D48960]/10 text-[#D48960] p-3 rounded-2xl hover:bg-[#D48960] hover:text-white transition-all active:scale-90"
                                            >
                                                <ShoppingCart size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <Search size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-lg font-bold text-slate-400">No hay plantas en esta categoría</p>
                            <button onClick={() => {setCategoriaActiva('Todos'); setSearchQuery('');}} className="mt-4 text-[#D48960] font-bold underline">Limpiar filtros</button>
                        </div>
                    )}
                </section>

                {/* EDUCACIÓN SECTION */}
                <section id="educacion" className="mb-24 relative">
                    <div className="bg-[#f3f7f3] rounded-[3rem] p-8 md:p-16 border border-[#1a401f]/5">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-[#1a401f] mb-4">Elimina la Frustración</h2>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                                El 86% de las plantas mueren por errores comunes. Nuestra plataforma te guía para que seas parte del 14% de éxito.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { t: "Guías de Riego", d: "Algoritmos que calculan la hidratación exacta según tu zona.", icon: <Droplets />, c: "text-blue-500" },
                                { t: "Diagnóstico AI", d: "Sube una foto y detectamos plagas o deficiencias al instante.", icon: <Bug />, c: "text-red-500" },
                                { t: "Luz y Ambiente", d: "Medimos la exposición lumínica de tus espacios vía smartphone.", icon: <Sun />, c: "text-amber-500" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                                    <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-[#1a401f] group-hover:text-white transition-colors ${item.c}`}>
                                        {React.cloneElement(item.icon, { size: 28 })}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1a401f] mb-3">{item.t}</h3>
                                    <p className="text-slate-500 leading-relaxed text-sm">{item.d}</p>
                                    <a href="/academia" className="mt-6 flex items-center text-[#D48960] font-bold text-sm cursor-pointer hover:underline">
                                        Aprender más <ChevronRight size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* LOGÍSTICA SECTION */}
                <section id="garantia" className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-[#1a401f]">Compromiso Logístico</h2>
                        <div className="h-1.5 w-24 bg-[#D48960] mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { t: "Inspección Fitosanitaria", d: "Doble chequeo antes de salir.", icon: <ShieldCheck /> },
                            { t: "Empaque Sostenible", d: "Materiales 100% compostables.", icon: <Package /> },
                            { t: "Monitoreo Activo", d: "Tracking en tiempo real.", icon: <Truck /> },
                            { t: "Garantía de Vida", d: "Reemplazo si llega dañada.", icon: <CheckCircle /> }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl hover:bg-[#1a401f]/5 transition-colors">
                                <div className="text-[#1a401f] mb-4">{React.cloneElement(item.icon, { size: 32 })}</div>
                                <h4 className="font-bold text-[#1a401f] mb-1">{item.t}</h4>
                                <p className="text-xs text-slate-400 font-medium">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="bg-[#1a401f] text-white/60 py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
                        <div className="col-span-1 md:col-span-2">
                            <h4 className="text-3xl font-black font-serif text-white mb-6">DONNI</h4>
                            <p className="max-w-md text-sm leading-relaxed mb-8">
                                Transformando el sector botánico a través de la educación y tecnología. En DONNI, cada planta es un compromiso de éxito compartido.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-white font-bold mb-6">Explorar</h5>
                            <ul className="space-y-4 text-sm font-medium">
                                <li><a href="/marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
                                <li><a href="/academia" className="hover:text-white transition-colors">Academia</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                        <p>© {new Date().getFullYear()} SEER | DONNI. All Rights Reserved.</p>
                        <p className="mt-4 md:mt-0">Diseñado por el equipo de Donni</p>
                    </div>
                    <div className="flex gap-4 mt-2">
                    <p className="cursor-pointer hover:underline">Aviso de Privacidad</p>
                    <p className="cursor-pointer hover:underline">Condiciones de Uso</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}