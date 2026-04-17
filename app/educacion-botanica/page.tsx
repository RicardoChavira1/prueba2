'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Clock, 
  Play,
  GraduationCap,
  Droplets,
  Sun,
  Bug,
  Package,
  CheckCircle,
  Info,
  Lightbulb,
  Globe,
  Zap,
  HeartPulse,
  BookOpen
} from 'lucide-react';

// --- ICONOS INTERNOS ---
const YoutubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"/></svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

// --- INTERFACES ---
interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
    instanceId: number;
}

// --- DATOS DE LA ACADEMIA ---
const CURSOS = [
    { 
        id: 1, 
        titulo: "Guía Completa: Cómo Cuidar tus Plantas de Interior", 
        nivel: "Principiante", 
        duracion: "12 min", 
        tipo: "Video", 
        categoria: "Salud", 
        imagen: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=600",
        url: "https://www.youtube.com/watch?v=Y1jTRsBRh3g"
    },
    { 
        id: 2, 
        titulo: "Secretos para Mantener tus Plantas Siempre Verdes", 
        nivel: "Intermedio", 
        duracion: "15 min", 
        tipo: "Video", 
        categoria: "Agua", 
        imagen: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=600",
        url: "https://www.youtube.com/watch?v=n7_UBqTYKMo" 
    },
    { 
        id: 3, 
        titulo: "Mantenimiento, Poda y Nutrición Botánica", 
        nivel: "Avanzado", 
        duracion: "10 min", 
        tipo: "Video", 
        categoria: "Suelo", 
        imagen: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600",
        url: "https://www.youtube.com/watch?v=6bQPBXFf0zc" 
    },
    { 
        id: 4, 
        titulo: "10 Acciones Esenciales para el Cuidado de las Plantas", 
        nivel: "Principiante", 
        duracion: "8 min lectura", 
        tipo: "Artículo", 
        categoria: "Salud", 
        imagen: "https://images.unsplash.com/photo-1520412099561-648319783e74?auto=format&fit=crop&q=80&w=600",
        url: "https://www.reddearboles.org/noticias/nwarticle/752/1/10-acciones-para-cuidar-las-plantas" 
    },
    { 
        id: 5, 
        titulo: "Lo que debes saber sobre el riego y la luz", 
        nivel: "Principiante", 
        duracion: "5 min lectura", 
        tipo: "Artículo", 
        categoria: "Luz", 
        imagen: "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?auto=format&fit=crop&q=80&w=600",
        url: "https://www.google.com/search?q=como+cuidar+plantas" 
    },
];

const WIKI_FACTS = [
    {
        id: 1,
        icon: <Zap className="text-amber-500" />,
        titulo: "¿Plantas que se comunican?",
        dato: "Las plantas usan redes de hongos subterráneas (micorrizas) para compartir nutrientes y enviarse alertas sobre plagas.",
        etiqueta: "Biología"
    },
    {
        id: 2,
        icon: <HeartPulse className="text-red-500" />,
        titulo: "Efecto Purificador",
        dato: "Una sola Sansevieria puede producir suficiente oxígeno para una persona en una habitación cerrada durante la noche.",
        etiqueta: "Salud"
    },
    {
        id: 3,
        icon: <Globe className="text-blue-500" />,
        titulo: "El Bosque Invisible",
        dato: "Existen más de 390,000 especies de plantas conocidas, pero solo el 10% han sido estudiadas por sus propiedades medicinales.",
        etiqueta: "Global"
    },
    {
        id: 4,
        icon: <Lightbulb className="text-[#D48960]" />,
        titulo: "Música y Crecimiento",
        dato: "Estudios sugieren que las vibraciones sonoras (música clásica) pueden estimular la apertura de estomas y mejorar la absorción.",
        etiqueta: "Curiosidad"
    }
];

export default function Academia() {
    const [carrito, setCarrito] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [filtro, setFiltro] = useState('Todos');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem('donni-cart');
        if (saved) {
            try { setCarrito(JSON.parse(saved)); } catch (e) { console.error(e); }
        }
    }, []);

    const cursosFiltrados = useMemo(() => {
        const base = filtro === 'Todos' ? CURSOS : CURSOS.filter(c => c.categoria === filtro);
        return base.filter(c => c.titulo.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [filtro, searchQuery]);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans selection:bg-[#D48960]/30 text-slate-800">
            
            {/* COMENTADO: HEADER DUPLICADO PARA EVITAR ERRORES DE PARSING */}
            {/* <header className="bg-[#1a401f] text-white shadow-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <span className="text-xl font-bold">D</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tighter font-serif">DONNI</h1>
                    </a>
                    <nav className="hidden lg:flex space-x-10 text-sm font-semibold uppercase tracking-widest">
                        <a href="/marketplace" className="hover:text-[#D48960] transition-colors">Marketplace</a>
                        <a href="/academia" className="text-[#D48960]">Academia</a>
                        <a href="/#comunidad" className="hover:text-[#D48960] transition-colors">Comunidad</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <a href="/carrito" className="relative p-2 rounded-full hover:bg-white/10 transition-all">
                            <ShoppingCart size={22} />
                            {carrito.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#D48960] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#1a401f] animate-pulse">
                                    {carrito.length}
                                </span>
                            )}
                        </a>
                        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </header> 
            */}

            <main className="flex-grow">
                {/* HERO */}
                <section className="bg-[#1a401f] text-white py-20 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
                                <GraduationCap size={16} className="text-[#D48960]" />
                                <span>Centro de Conocimiento Botánico</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight font-serif">
                                Tu Guía para una <br />
                                <span className="text-[#D48960]">Vida Verde</span> Exitosa
                            </h2>
                            <div className="relative max-w-md mx-auto md:mx-0">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Buscar tutorial o artículo..." 
                                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:text-[#1a401f] transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FILTROS */}
                <section className="container mx-auto px-4 -translate-y-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { t: "Agua", i: <Droplets />, c: "bg-blue-500" },
                            { t: "Luz", i: <Sun />, c: "bg-amber-500" },
                            { t: "Suelo", i: <Package />, c: "bg-emerald-500" },
                            { t: "Salud", i: <Bug />, c: "bg-red-500" }
                        ].map((tool, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setFiltro(tool.t)}
                                className={`p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 hover:scale-105 transition-all border ${filtro === tool.t ? 'bg-[#1a401f] text-white' : 'bg-white border-slate-100'}`}
                            >
                                <div className={`${filtro === tool.t ? 'bg-white text-[#1a401f]' : `${tool.c} text-white`} p-3 rounded-xl transition-colors`}>{tool.i}</div>
                                <span className="font-bold">{tool.t}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* CURSOS Y CONTENIDO */}
                <section className="container mx-auto px-4 py-12">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-black text-[#1a401f] font-serif tracking-tight">Contenido Destacado</h3>
                        {filtro !== 'Todos' && (
                            <button onClick={() => setFiltro('Todos')} className="text-sm font-bold text-[#D48960] underline">Mostrar todos</button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {cursosFiltrados.map(curso => (
                            <div key={curso.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col">
                                <div className="relative h-64 overflow-hidden bg-slate-100">
                                    <a href={curso.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                                        <img src={curso.imagen} alt={curso.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        
                                        {curso.tipo === 'Video' ? (
                                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                                <div className="w-20 h-20 bg-[#D48960] rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform border-4 border-white/20">
                                                    <Play fill="currentColor" size={32} className="ml-1" />
                                                </div>
                                                <div className="absolute bottom-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg uppercase tracking-widest">
                                                    <YoutubeIcon /> YouTube
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/30 transition-colors flex items-center justify-center">
                                                <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#1a401f] shadow-xl group-hover:scale-110 transition-transform">
                                                    <ExternalLinkIcon />
                                                </div>
                                            </div>
                                        )}
                                    </a>
                                    
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-[#1a401f] shadow-sm">
                                        {curso.tipo}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                        <span className="text-[#D48960]">{curso.nivel}</span>
                                        <span className="opacity-30">•</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {curso.duracion}</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-[#1a401f] mb-6 group-hover:text-[#D48960] transition-colors line-clamp-2 font-serif leading-tight">
                                        {curso.titulo}
                                    </h4>
                                    
                                    <div className="mt-auto pt-6 border-t border-slate-50">
                                        <a 
                                            href={curso.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                                                curso.tipo === 'Video' 
                                                ? 'bg-slate-50 text-[#1a401f] hover:bg-[#1a401f] hover:text-white' 
                                                : 'bg-[#D48960]/10 text-[#D48960] hover:bg-[#D48960] hover:text-white'
                                            }`}
                                        >
                                            {curso.tipo === 'Video' ? 'Ver en YouTube' : 'Leer Artículo'}
                                            {curso.tipo === 'Video' ? <YoutubeIcon /> : <ExternalLinkIcon />}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* WIKI DE CURIOSIDADES */}
                <section className="bg-white py-24 border-t border-slate-100">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                            <div className="max-w-2xl">
                                <span className="text-[#D48960] font-black uppercase text-[10px] tracking-[0.3em] mb-4 block">Exploración Wiki</span>
                                <h3 className="text-4xl md:text-5xl font-black text-[#1a401f] font-serif leading-none">
                                    Secretos del <br /> Reino Plantae
                                </h3>
                            </div>
                            <p className="text-slate-400 font-medium max-w-sm text-sm">
                                Datos fascinantes que cambiarán tu forma de ver y cuidar a tus compañeras verdes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {WIKI_FACTS.map((fact) => (
                                <div key={fact.id} className="bg-[#fafaf9] p-8 rounded-[2.5rem] border border-slate-100 hover:border-[#1a401f]/20 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                        {React.cloneElement(fact.icon as React.ReactElement, { size: 28 })}
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2 block group-hover:text-[#D48960] transition-colors">
                                        {fact.etiqueta}
                                    </span>
                                    <h4 className="text-xl font-bold text-[#1a401f] mb-4 font-serif leading-tight">
                                        {fact.titulo}
                                    </h4>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                        {fact.dato}
                                    </p>
                                    <div className="mt-8 pt-6 border-t border-slate-200/50 flex items-center text-[#1a401f] font-bold text-xs cursor-pointer group-hover:gap-2 transition-all">
                                        Ver fuente Wiki <ChevronRight size={14} className="text-[#D48960]" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 bg-[#1a401f] rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-white shadow-2xl">
                            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                                <BookOpen size={200} />
                            </div>
                            <div className="relative z-10 max-w-2xl">
                                <h4 className="text-3xl md:text-4xl font-black font-serif mb-6">¿Tienes un secreto botánico que compartir?</h4>
                                <p className="text-white/70 text-lg mb-10 leading-relaxed">
                                    Nuestra comunidad académica crece gracias a las experiencias de miles de "Plant Parents". Envíanos tus tips y podrías aparecer en nuestra Wiki oficial.
                                </p>
                                <button className="bg-[#D48960] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#C27A59] transition-all shadow-xl shadow-black/20 active:scale-95">
                                    Contribuir a la Academia
                                </button>
                            </div>
                        </div>
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
                </div>
            </footer>
        </div>
    );
}