'use client';

import React from 'react';
import { Sprout, BookOpen, Globe, Heart } from 'lucide-react';
import Image from 'next/image';

export default function NosotrosPage() {
    return (
        <div className="min-h-screen bg-[#fafaf9] font-sans text-slate-800 selection:bg-[#D48960]/30">
            <main className="container mx-auto px-6 py-16 max-w-5xl">

                {/* HERO SECTION */}
                <div className="text-center mb-20">
                    <span className="text-[#D48960] font-black uppercase text-xs tracking-[0.3em] mb-4 block">Nuestra Raíz</span>
                    <h1 className="text-5xl md:text-7xl font-black text-[#1a401f] font-serif tracking-tight mb-8">
                        Más que una tienda, <br className="hidden md:block" />
                        <span className="text-[#D48960]">un ecosistema.</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        DONNI nació de una frustración común: ver morir plantas hermosas por falta de información. Decidimos cambiar las reglas del juego fusionando la botánica con la tecnología y la educación.
                    </p>
                </div>

                {/* IMAGEN DE IMPACTO */}
                <div className="relative w-full h-[400px] rounded-[3rem] overflow-hidden mb-24 shadow-2xl border border-slate-100">
                    <img
                        src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200"
                        alt="Equipo botánico DONNI"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#1a401f]/20 mix-blend-multiply"></div>
                </div>

                {/* VALORES (GRID) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-14 h-14 bg-[#1a401f]/5 text-[#1a401f] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1a401f] group-hover:text-white transition-colors">
                            <BookOpen size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1a401f] mb-4 font-serif">Educación Primero</h3>
                        <p className="text-slate-500 leading-relaxed">
                            No vendemos plantas para que decoren una semana. Te entregamos el conocimiento exacto, curado por expertos, para que crezcan contigo durante años.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-14 h-14 bg-[#D48960]/10 text-[#D48960] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#D48960] group-hover:text-white transition-colors">
                            <Sprout size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1a401f] mb-4 font-serif">Especies Seleccionadas</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Cada especie en nuestro Marketplace pasa por una estricta cuarentena y revisión fitosanitaria. Solo las plantas más fuertes llegan a tu puerta.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Globe size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1a401f] mb-4 font-serif">Impacto Ecológico</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Empaques 100% biodegradables y procesos que respetan los ciclos naturales. Devolvemos a la tierra el respeto que nos brinda.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <Heart size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1a401f] mb-4 font-serif">Comunidad Apasionada</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Construimos un espacio donde los "Plant Parents" no están solos. Soporte, dudas y triunfos se comparten en nuestra futura red de miembros.
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}