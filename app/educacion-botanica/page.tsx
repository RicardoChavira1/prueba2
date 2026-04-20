'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
    Clock, Play, GraduationCap, Droplets, Sun, Bug,
    Package, CheckCircle, Lightbulb, Globe, Zap,
    HeartPulse, BookOpen, ChevronRight, Award,
    Search
} from 'lucide-react';

// --- ICONOS INTERNOS ---
const YoutubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" /></svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
);

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
        url: "https://www.youtube.com/watch?v=Y1jTRsBRh3g",
        autor: "Maos Terra, Paisajismo",
        esAutorPropio: false// el true muestra en verde que es de nuestra autoria
    },
    {
        id: 2,
        titulo: "Secretos para Mantener tus Plantas Siempre Verdes",
        nivel: "Intermedio",
        duracion: "15 min",
        tipo: "Video",
        categoria: "Agua",
        imagen: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=600",
        url: "https://www.youtube.com/watch?v=n7_UBqTYKMo",
        autor: "Botánica Global",
        esAutorPropio: false
    },
    {
        id: 3,
        titulo: "Mantenimiento, Poda y Nutrición Botánica",
        nivel: "Avanzado",
        duracion: "10 min",
        tipo: "Video",
        categoria: "Suelo",
        imagen: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600",
        url: "https://www.youtube.com/watch?v=6bQPBXFf0zc",
        autor: "Ecología Verde",
        esAutorPropio: false
    },
    {
        id: 4,
        titulo: "10 Acciones Esenciales para el Cuidado de las Plantas",
        nivel: "Principiante",
        duracion: "8 min lectura",
        tipo: "Artículo",
        categoria: "Salud",
        imagen: "https://images.unsplash.com/photo-1520412099561-648319783e74?auto=format&fit=crop&q=80&w=600",
        url: "https://www.reddearboles.org/noticias/nwarticle/752/1/10-acciones-para-cuidar-las-plantas",
        autor: "Red de Árboles",
        esAutorPropio: false
    },
    {
        id: 5,
        titulo: "Lo que debes saber sobre el riego y la luz",
        nivel: "Principiante",
        duracion: "5 min lectura",
        tipo: "Artículo",
        categoria: "Luz",
        imagen: "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?auto=format&fit=crop&q=80&w=600",
        url: "https://ecologiaverde.elperiodico.com/como-cuidar-las-plantas-3655.html",
        autor: "Ecología verde",
        esAutorPropio: false
    },
];

// --- SOLUCIÓN DE ERROR TYPESCRIPT ---
// Guardamos la REFERENCIA del componente (Zap) en lugar del elemento (<Zap />)
const WIKI_FACTS = [
    {
        id: 1,
        icon: Zap,
        iconColor: "text-amber-500",
        titulo: "¿Plantas que se comunican?",
        dato: "Las plantas usan redes de hongos subterráneas (micorrizas) para compartir nutrientes y enviarse alertas sobre plagas.",
        etiqueta: "Biología"
    },
    {
        id: 2,
        icon: HeartPulse,
        iconColor: "text-red-500",
        titulo: "Efecto Purificador",
        dato: "Una sola Sansevieria puede producir suficiente oxígeno para una persona en una habitación cerrada durante la noche.",
        etiqueta: "Salud"
    },
    {
        id: 3,
        icon: Globe,
        iconColor: "text-blue-500",
        titulo: "El Bosque Invisible",
        dato: "Existen más de 390,000 especies de plantas conocidas, pero solo el 10% han sido estudiadas por sus propiedades medicinales.",
        etiqueta: "Global"
    },
    {
        id: 4,
        icon: Lightbulb,
        iconColor: "text-[#D48960]",
        titulo: "Música y Crecimiento",
        dato: "Estudios sugieren que las vibraciones sonoras (música clásica) pueden estimular la apertura de estomas y mejorar la absorción.",
        etiqueta: "Curiosidad"
    }
];

export default function Academia() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filtro, setFiltro] = useState('Todos');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cursosFiltrados = useMemo(() => {
        const base = filtro === 'Todos' ? CURSOS : CURSOS.filter(c => c.categoria === filtro);
        return base.filter(c => c.titulo.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [filtro, searchQuery]);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans selection:bg-[#D48960]/30 text-slate-800">

            <main className="flex-grow">
                {/* HERO */}
                <section className="bg-[#1a401f] text-white py-20 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-12">

                            {/* Columna izquierda: texto y buscador */}
                            <div className="max-w-3xl text-center md:text-left">
                                <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 shadow-sm">
                                    <GraduationCap size={16} className="text-[#D48960]" />
                                    <span>Centro de Conocimiento Botánico</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight font-serif">
                                    Tu Guía para una <br />
                                    <span className="text-[#D48960]">Vida Verde</span> Exitosa
                                </h2>
                                {/* <div className="relative max-w-md mx-auto md:mx-0">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a401f]/40" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Buscar tutorial o artículo..."
                                        className="w-full bg-white border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 outline-none text-[#1a401f] focus:border-[#D48960] transition-all shadow-xl"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div> */}
                            </div>

                            {/* Columna derecha: Logo de Donni con efecto resaltado */}
                            <div className="flex-shrink-0">
                                <div className="relative w-40 h-40 md:w-56 md:h-56">
                                    {/* Círculo de fondo con brillo */}
                                    <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl animate-pulse"></div>
                                    {/* Círculo decorativo */}
                                    <div className="absolute inset-0 rounded-full border-2 border-white/40 shadow-2xl"></div>
                                    {/* Logo */}
                                    <img
                                        src="/logo.jpeg"
                                        alt="Donni Logo"
                                        className="w-full h-full object-contain rounded-full bg-white/10 p-2 relative z-10 shadow-xl"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* FILTROS */}
                <section className="container mx-auto px-4 -translate-y-10 relative z-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { t: "Agua", i: <Droplets />, c: "bg-blue-500 text-blue-500" },
                            { t: "Luz", i: <Sun />, c: "bg-amber-500 text-amber-500" },
                            { t: "Suelo", i: <Package />, c: "bg-emerald-500 text-emerald-500" },
                            { t: "Salud", i: <Bug />, c: "bg-red-500 text-red-500" }
                        ].map((tool, idx) => (
                            <button
                                key={idx}
                                onClick={() => setFiltro(tool.t)}
                                className={`p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-center md:justify-start space-y-3 md:space-y-0 md:space-x-4 hover:-translate-y-1 transition-all border-2 ${filtro === tool.t ? 'bg-[#1a401f] border-[#1a401f] text-white' : 'bg-white border-white hover:border-slate-100 text-slate-700'
                                    }`}
                            >
                                <div className={`${filtro === tool.t ? 'bg-white text-[#1a401f]' : 'bg-slate-50 ' + tool.c} p-4 rounded-2xl transition-colors`}>
                                    {tool.i}
                                </div>
                                <span className="font-black text-lg tracking-tight">{tool.t}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* CURSOS Y CONTENIDO (PUNTO 8 APLICADO) */}
                <section className="container mx-auto px-4 py-12">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h3 className="text-3xl font-black text-[#1a401f] font-serif tracking-tight">Contenido Destacado</h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Aprende a tu propio ritmo</p>
                        </div>
                        {filtro !== 'Todos' && (
                            <button onClick={() => setFiltro('Todos')} className="text-xs font-black uppercase tracking-widest text-[#D48960] hover:text-[#1a401f] transition-colors border-b-2 border-[#D48960] hover:border-[#1a401f] pb-1">
                                Ver todo el catálogo
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {cursosFiltrados.map(curso => (
                            <div key={curso.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col">

                                {/* IMAGEN Y TIPO */}
                                <div className="relative h-60 overflow-hidden bg-slate-100">
                                    <a href={curso.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                                        <img src={curso.imagen} alt={curso.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

                                        {curso.tipo === 'Video' ? (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#1a401f] shadow-2xl group-hover:scale-110 transition-transform">
                                                    <Play fill="currentColor" size={24} className="ml-1" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#1a401f] shadow-2xl group-hover:scale-110 transition-transform">
                                                    <ExternalLinkIcon />
                                                </div>
                                            </div>
                                        )}
                                    </a>

                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#1a401f] shadow-sm">
                                        {curso.tipo}
                                    </div>
                                </div>

                                {/* CONTENIDO Y AUTORÍA (PUNTO 8) */}
                                <div className="p-8 flex flex-col flex-grow">

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span className="text-[#D48960]">{curso.nivel}</span>
                                            <span className="opacity-30">•</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {curso.duracion}</span>
                                        </div>

                                        {/* BADGE DE AUTORÍA (Punto 8) */}
                                        {curso.esAutorPropio ? (
                                            <div className="bg-[#115e3b] text-white text-[9px] px-2 py-1 rounded-md font-black uppercase tracking-widest flex items-center gap-1 shadow-sm" title="Contenido oficial verificado por DONNI">
                                                <Award size={12} /> AUTOR: {curso.autor}
                                            </div>
                                        ) : (
                                            <div className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                                                Por: {curso.autor}
                                            </div>
                                        )}
                                    </div>

                                    <h4 className="text-xl font-bold text-[#1a401f] mb-6 group-hover:text-[#D48960] transition-colors font-serif leading-tight">
                                        {curso.titulo}
                                    </h4>

                                    <div className="mt-auto pt-6 border-t border-slate-50">
                                        <a
                                            href={curso.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${curso.tipo === 'Video'
                                                ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'
                                                : 'bg-slate-50 text-[#1a401f] hover:bg-[#1a401f] hover:text-white'
                                                }`}
                                        >
                                            {curso.tipo === 'Video' ? 'Ver en YouTube' : 'Leer Artículo Completo'}
                                            {curso.tipo === 'Video' ? <YoutubeIcon /> : <ChevronRight size={18} />}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* WIKI DE CURIOSIDADES (ERROR TS RESUELTO) */}
                {/*  <section className="bg-white py-24 border-t border-slate-100">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                            <div className="max-w-2xl">
                                <span className="text-[#D48960] font-black uppercase text-[10px] tracking-[0.3em] mb-4 block">Exploración Wiki</span>
                                <h3 className="text-4xl md:text-5xl font-black text-[#1a401f] font-serif leading-none">
                                    Secretos del <br /> Reino Plantae
                                </h3>
                            </div>
                            <p className="text-slate-500 font-medium max-w-sm text-sm">
                                Datos fascinantes que cambiarán tu forma de ver y cuidar a tus compañeras verdes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {WIKI_FACTS.map((fact) => {
                                // Aquí renderizamos el componente directamente
                                const IconComponent = fact.icon;
                                return (
                                    <div key={fact.id} className="bg-[#fafaf9] p-8 rounded-[2.5rem] border border-slate-100 hover:border-[#D48960]/30 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-all">

                                            <IconComponent size={28} className={fact.iconColor} />
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
                                    </div>
                                );
                            })}
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
                                <button className="bg-[#D48960] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#C27A59] transition-all shadow-xl shadow-black/20 active:scale-95 flex items-center gap-2">
                                    <Lightbulb size={18} /> Contribuir a la Academia
                                </button>
                            </div>
                        </div>
                    </div>
                </section> */}
            </main>

        </div >
    );
}