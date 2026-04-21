'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
    ShoppingCart, Search, Droplets, Bug, Sun, CheckCircle, ArrowRight, 
    ChevronRight, Package, ShieldCheck, Flower, Eye, Star, Plus, Filter
} from 'lucide-react';

// --- INTERFACES ---
interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
    instanceId: number;
}

// --- DATOS SINCRONIZADOS CON EL MARKETPLACE (Precios topados a $450) ---
const PLANTAS_DATA = [
  { "id": 1, "nombre": "Monstera Deliciosa", "nombreCientifico": "Monstera deliciosa", "precio": 450, "categoria": "Interior", "imagen": "https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800", "cuidados": { "riego": "Mod", "luz": "Ind", "dificultad": "Fácil" } },
    { "id": 2, "nombre": "Sansevieria", "nombreCientifico": "Dracaena trifasciata", "precio": 280, "categoria": "Resistente", "imagen": "https://images.pexels.com/photos/5858235/pexels-photo-5858235.jpeg?auto=compress&cs=tinysrgb&w=800", "cuidados": { "riego": "Bajo", "luz": "Todo", "dificultad": "M. Fácil" } },
    { "id": 3, "nombre": "Poto (Epipremnum)", "nombreCientifico": "Epipremnum aureum", "precio": 190, "categoria": "Colgante", "imagen": "https://images.pexels.com/photos/7663986/pexels-photo-7663986.jpeg?auto=compress&cs=tinysrgb&w=800", "cuidados": { "riego": "Mod", "luz": "Med", "dificultad": "Fácil" } },
    { "id": 4, "nombre": "Echeveria Blue", "nombreCientifico": "Echeveria elegans", "precio": 120, "categoria": "Suculenta", "imagen": "https://imgs.search.brave.com/NwSxXgXfZtpjexI9LS1mbN8zSS8QMpT73t-2RjT5cPU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzIxNDYyMzM2L3Iv/aWwvNGIyZDM2LzM1/ODQ0OTA3NDAvaWxf/NjAweDYwMC4zNTg0/NDkwNzQwX3JkYXgu/anBn", "cuidados": { "riego": "M.Bajo", "luz": "Sol", "dificultad": "Fácil" } },
    { "id": 5, "nombre": "Ficus Lyrata", "nombreCientifico": "Ficus lyrata", "precio": 450, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/r8N-mD2EtDGNfl_CWQ8CAMU2aPNy8EGQrldWsJKDpac/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVycGxhbnQuZXMv/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MTAvZmljdXMtbHly/YXRhLWwtMzAweDM3/NS5qcGc", "cuidados": { "riego": "Mod", "luz": "Ind", "dificultad": "Media" } },
    { "id": 6, "nombre": "Cactus de Asiento", "nombreCientifico": "Echinocactus grusonii", "precio": 320, "categoria": "Exterior", "imagen": "https://imgs.search.brave.com/5IxequsIpjXtc4RKqvMtObSmnyZZCrOt8N__1EDmYUY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jYWN0/dXNvbmxpbmUuZXMv/Y2RuL3Nob3AvZmls/ZXMvRFNDMDM3ODcu/anBnP3Y9MTc3NDAx/MzgyOCZ3aWR0aD0x/NDQ1", "cuidados": { "riego": "Min", "luz": "Sol", "dificultad": "M. Fácil" } },
    { "id": 7, "nombre": "Helecho Boston", "nombreCientifico": "Nephrolepis exaltata", "precio": 250, "categoria": "Humedad", "imagen": "https://imgs.search.brave.com/dsA-8NEkwgSPGreKxpGIpo6cUMMf8Ino8QINL6UCOaI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9seXJh/dGEuY29tL2Nkbi9z/aG9wL2ZpbGVzL0hF/TEVDSE9fQk9TVE9O/X05FR1JPX1NVUF9N/QVBMRS5qcGc_dj0x/NzY1MjE0NTc3Jndp/ZHRoPTE0NDU", "cuidados": { "riego": "Freq", "luz": "Som", "dificultad": "Media" } },
    { "id": 8, "nombre": "Palma Areca", "nombreCientifico": "Dypsis lutescens", "precio": 430, "categoria": "Interior", "imagen": "https://imgs.search.brave.com/o9oQCZzCKPabnCnsD9LDdwxhkT81PPcj387JwjnRCcU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jaGFw/b21hcnQuY29tLm14/LzM2NDctaG9tZV9k/ZWZhdWx0L3BhbG1h/LWFyZWNhLTE4MGNt/LWRlLWFsdHVyYS5q/cGc", "cuidados": { "riego": "Reg", "luz": "Bril", "dificultad": "Media" } },
  ];


export default function App() {
    const [carrito, setCarrito] = useState<CartItem[]>([]);
    const [notificacion, setNotificacion] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [categoriaActiva, setCategoriaActiva] = useState('Todas');

    // --- LÓGICA DE PERSISTENCIA ---
    useEffect(() => {
        setIsMounted(true);
        const carritoGuardado = localStorage.getItem('donni-cart');
        if (carritoGuardado) {
            try { setCarrito(JSON.parse(carritoGuardado)); } 
            catch (e) { console.error("Error al cargar el carrito"); }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('donni-cart', JSON.stringify(carrito));
            window.dispatchEvent(new Event('storage'));
        }
    }, [carrito, isMounted]);

    // Extraer categorías dinámicamente
    const categoriasDinamicas = useMemo(() => {
        const categoriasUnicas = new Set(PLANTAS_DATA.map(p => p.categoria));
        return ['Todas', ...Array.from(categoriasUnicas)];
    }, []);

    // Filtrar plantas
    const plantasFiltradas = useMemo(() => {
        if (categoriaActiva === 'Todas') return PLANTAS_DATA;
        return PLANTAS_DATA.filter(p => p.categoria === categoriaActiva);
    }, [categoriaActiva]);

    // Lógica de Carrito
    const agregarAlCarrito = (planta: any) => {
        const nuevoItem: CartItem = { ...planta, instanceId: Date.now() + Math.random() };
        setCarrito(prev => [...prev, nuevoItem]);
        mostrarNotificacion(`¡${planta.nombre} añadido al carrito!`);
    };

    const mostrarNotificacion = (msj: string) => {
        setNotificacion(msj);
        setTimeout(() => setNotificacion(null), 3000);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen font-sans text-slate-800 bg-white selection:bg-[#D48960]/30">

            {notificacion && (
                <div className="fixed bottom-8 right-8 z-[100] bg-[#1a401f] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce border-l-4 border-[#D48960]">
                    <CheckCircle size={20} className="text-[#D48960]" />
                    <span className="font-medium uppercase text-xs tracking-widest">{notificacion}</span>
                </div>
            )}

            {/* SE ELIMINÓ EL HEADER HARDCODEADO PORQUE YA ESTÁ EN LAYOUT.TSX */}

            <main className="container mx-auto px-4 py-8 md:py-12">

                {/* HERO SECTION PREMIUM */}
                <section className="relative overflow-hidden bg-[#1a401f] rounded-[2.5rem] mb-24 flex flex-col lg:flex-row items-stretch shadow-2xl">
                    
                    {/* MITAD IZQUIERDA: Texto y CTA */}
                    <div className="relative z-10 p-8 md:p-16 lg:p-20 lg:w-1/2 flex flex-col items-start text-left justify-center">
                        <span className="bg-[#D48960]/20 text-[#D48960] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#D48960]/20 backdrop-blur-sm shadow-sm">
                            Impulsando tu Éxito Botánico
                        </span>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 max-w-2xl font-serif">
                            Naturaleza con <br className="hidden md:block"/>
                            <span className="text-[#D48960]">Conocimiento</span> Real.
                        </h2>
                        
                        <p className="text-lg text-white/70 max-w-xl mb-10 leading-relaxed font-medium">
                            No solo vendemos plantas, entregamos la confianza de verlas crecer. Soporte experto 24/7 y guías personalizadas en cada envío.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                            <a href="/marketplace" className="bg-[#D48960] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-[#c27a51] hover:-translate-y-1 transition-all shadow-lg shadow-[#D48960]/30 active:scale-95">
                                Explorar Catálogo <ArrowRight size={18} className="ml-2" />
                            </a>
                        </div>
                    </div>

                    {/* MITAD DERECHA: Imagen de Impacto */}
                    <div className="relative w-full lg:w-1/2 h-80 lg:h-auto min-h-[350px] lg:min-h-[600px] overflow-hidden">
                        {/* Truco CSS: Gradiente para fundir la imagen con el fondo verde en versión Desktop y Mobile */}
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent via-[#1a401f]/60 to-[#1a401f] z-10"></div>
                        
                        <img 
                            src="/donni-v1.jpg" 
                            alt="Ecosistema Botánico DONNI" 
                            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-[10s] ease-out"
                        />
                    </div>
                </section>
                {/* MARKETPLACE SECTION (SINCRONIZADO) */}
                <section id="marketplace" className="mb-24">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-[#1a401f] font-serif">Colección Destacada</h2>
                            <p className="text-slate-400 mt-2 font-medium italic">Un vistazo a nuestras especies más amadas</p>
                        </div>
                        <a href="/marketplace" className="text-sm font-bold text-[#D48960] hover:text-[#1a401f] transition-colors border-b-2 border-transparent hover:border-[#1a401f] pb-1">
                            Ver todo el catálogo
                        </a>
                    </div>

                    {/* FILTROS DINÁMICOS */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-2 scrollbar-hide">
                        <div className="flex items-center text-[#1a401f] mr-2 opacity-50 shrink-0">
                            <Filter size={18} className="mr-2" />
                            <span className="text-xs font-black uppercase tracking-widest">Filtros:</span>
                        </div>
                        {categoriasDinamicas.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setCategoriaActiva(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 border-2 shrink-0 ${
                                    categoriaActiva === cat 
                                    ? 'bg-[#1a401f] text-white border-[#1a401f] shadow-md shadow-[#1a401f]/20' 
                                    : 'bg-white text-slate-400 border-slate-100 hover:border-[#D48960] hover:text-[#D48960]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {plantasFiltradas.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {plantasFiltradas.map(p => (
                                <div key={p.id} className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                                    <a href={`/marketplace/${p.id}`} className="relative h-64 overflow-hidden bg-slate-100 block cursor-pointer">
                                        <img 
                                            src={p.imagen} 
                                            alt={p.nombre} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                        />
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-[#1a401f] shadow-sm">
                                            {p.categoria}
                                        </div>
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="bg-white text-[#1a401f] px-6 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                                                <Eye size={14} /> Ver Ficha
                                            </div>
                                        </div>
                                    </a>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center text-amber-400 mb-3">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                            <span className="text-[9px] font-black ml-2 text-slate-300 uppercase">Verificada</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1a401f] leading-tight font-serif h-12 line-clamp-2">
                                            {p.nombre}
                                        </h3>
                                        <p className="text-[10px] italic text-slate-400 mb-4 truncate">{p.nombreCientifico}</p>
                                        
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                            <div>
                                                <span className="text-[10px] text-slate-300 font-bold uppercase block mb-1">Inversión</span>
                                                <span className="text-2xl font-black text-[#1a401f] tracking-tighter">${p.precio}</span>
                                            </div>
                                            <button 
                                                onClick={() => agregarAlCarrito(p)}
                                                className="w-12 h-12 rounded-2xl bg-[#1a401f] text-white hover:bg-[#D48960] transition-all flex items-center justify-center shadow-lg shadow-[#1a401f]/10 active:scale-90"
                                            >
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                            <Search size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-lg font-bold text-slate-400">No hay plantas en esta categoría</p>
                            <button onClick={() => setCategoriaActiva('Todas')} className="mt-4 text-[#D48960] font-bold underline">Limpiar filtros</button>
                        </div>
                    )}
                </section>

                {/* EDUCACIÓN SECTION */}
                <section id="educacion" className="mb-24 relative">
                    <div className="bg-[#f3f7f3] rounded-[3rem] p-8 md:p-16 border border-[#1a401f]/5">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-[#1a401f] mb-4 font-serif">Elimina la Frustración</h2>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                                El 86% de las plantas mueren por errores comunes. Nuestra plataforma te guía para que seas parte del 14% de éxito.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    t: "Guías de Riego",
                                    d: "Consejos prácticos y calendarios de riego adaptados a tu clima y tipo de planta.",
                                    icon: <Droplets />,
                                    c: "text-blue-500"
                                },
                                {
                                    t: "Diagnóstico Asistido",
                                    d: "Próximamente: Identifica plagas con ayuda de IA y nuestra comunidad. (Premium)",
                                    icon: <Bug />,
                                    c: "text-red-500",
                                    premium: true
                                },
                                {
                                    t: "Luz y Ambiente",
                                    d: "Recomendaciones de ubicación según la luz natural de tu hogar.",
                                    icon: <Sun />,
                                    c: "text-amber-500"
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative">
                                    {item.premium && (
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
                                            <span>⭐</span> PREMIUM
                                        </div>
                                    )}
                                    <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-[#1a401f] group-hover:text-white transition-colors ${item.c}`}>
                                        {React.cloneElement(item.icon, { size: 28 })}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1a401f] mb-3">{item.t}</h3>
                                    <p className="text-slate-500 leading-relaxed text-sm">{item.d}</p>
                                    <a href="/educacion-botanica" className="mt-6 flex items-center text-[#D48960] font-bold text-sm cursor-pointer hover:underline">
                                        Aprender más <ChevronRight size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* LOGÍSTICA SECTION PREMIUM */}
                <section id="garantia" className="mb-12">
                    <div className="bg-[#1a401f] rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl border border-[#265c2c]">
                        
                        {/* Elementos Decorativos de Fondo */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D48960]/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D48960]/10 rounded-full blur-[60px] -ml-20 -mb-20 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            
                            {/* Textos y CTA */}
                            <div className="lg:w-1/3 text-center lg:text-left">
                                <h2 className="text-3xl md:text-4xl font-black text-white font-serif mb-4">
                                    Compromiso <span className="text-[#D48960]">Logístico</span>
                                </h2>
                                <p className="text-white/70 text-sm leading-relaxed mb-8 font-medium">
                                    El viaje de una planta es delicado. Hemos rediseñado la logística botánica para garantizar que tu nueva compañera llegue intacta.
                                </p>
                                <a href="/logistica" className="inline-flex items-center text-[#D48960] font-bold text-sm hover:text-white transition-colors group">
                                    Conoce el proceso completo <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* Iconos de Garantía */}
                            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                                {[
                                    { t: "Fitosanitaria", d: "Libre de plagas", icon: <ShieldCheck /> },
                                    { t: "Empaque", d: "100% Sostenible", icon: <Package /> },
                                    { t: "Educación", d: "Guía incluida", icon: <Flower /> },
                                    { t: "Garantía", d: "Seguro de viaje", icon: <CheckCircle /> }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center p-4 group">
                                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D48960] mb-4 group-hover:bg-[#D48960] group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-lg">
                                            {React.cloneElement(item.icon, { size: 24 })}
                                        </div>
                                        <h4 className="font-bold text-white text-sm mb-1">{item.t}</h4>
                                        <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}