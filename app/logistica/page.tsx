'use client';

import React from 'react';
import { Truck, ShieldCheck, Package, Droplets, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LogisticaPage() {
    return (
        <div className="min-h-screen bg-[#fafaf9] font-sans text-slate-800 selection:bg-[#D48960]/30">
            <main className="container mx-auto px-6 py-16 max-w-5xl">

                {/* HEADER LOGÍSTICA */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1a401f]/10 text-[#1a401f] rounded-full mb-6">
                        <Truck size={40} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a401f] font-serif tracking-tight mb-6">
                        Viaje Seguro a Casa
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Enviar seres vivos requiere ciencia, cuidado y el empaque perfecto. Así garantizamos que tu nueva compañera llegue radiante.
                    </p>
                </div>

                {/* PASOS DEL PROCESO */}
                <div className="relative mb-24">
                    {/* Línea conectora (solo visible en desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">

                        {/* Paso 1 */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 text-center relative">
                            <div className="w-12 h-12 bg-[#1a401f] text-white rounded-full flex items-center justify-center font-black text-xl absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-[#fafaf9]">1</div>
                            <ShieldCheck size={32} className="mx-auto mt-4 mb-4 text-[#D48960]" />
                            <h3 className="text-xl font-bold text-[#1a401f] mb-3">Inspección Fitosanitaria</h3>
                            <p className="text-sm text-slate-500">
                                Antes de salir, nuestros expertos revisan tallos, hojas y raíces para descartar plagas y asegurar salud óptima.
                            </p>
                        </div>

                        {/* Paso 2 */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 text-center relative">
                            <div className="w-12 h-12 bg-[#1a401f] text-white rounded-full flex items-center justify-center font-black text-xl absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-[#fafaf9]">2</div>
                            <Package size={32} className="mx-auto mt-4 mb-4 text-[#D48960]" />
                            <h3 className="text-xl font-bold text-[#1a401f] mb-3">Empaque Climático</h3>
                            <p className="text-sm text-slate-500">
                                Usamos un sistema de retención de humedad y cartón estructural reciclado que protege contra golpes y cambios de temperatura.
                            </p>
                        </div>

                        {/* Paso 3 */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 text-center relative">
                            <div className="w-12 h-12 bg-[#1a401f] text-white rounded-full flex items-center justify-center font-black text-xl absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-[#fafaf9]">3</div>
                            <Droplets size={32} className="mx-auto mt-4 mb-4 text-[#D48960]" />
                            <h3 className="text-xl font-bold text-[#1a401f] mb-3">Viaje Express (24-48h)</h3>
                            <p className="text-sm text-slate-500">
                                Trabajamos con paqueterías premium. La planta viaja el menor tiempo posible para evitar estrés hídrico.
                            </p>
                        </div>

                    </div>
                </div>

                {/* GARANTÍA BOTÁNICA */}
                <div className="bg-[#1a401f] rounded-[3rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
                    {/* Elemento decorativo */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#D48960] rounded-full blur-[80px] opacity-30"></div>

                    <div className="relative z-10 max-w-lg text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-black font-serif mb-4">Garantía DONNI</h2>
                        <p className="text-white/80 text-lg leading-relaxed mb-8">
                            Sabemos que imprevistos pasan. Si tu planta llega con daños estructurales por el viaje, te enviamos un reemplazo gratuito. Solo repórtalo en las primeras 48 horas con fotografías.
                        </p>
                        <Link href="/marketplace" className="inline-flex items-center bg-[#D48960] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#c27a51] transition-all shadow-lg hover:-translate-y-1">
                            Ir a comprar con confianza <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>

                    <div className="relative z-10 hidden md:block">
                        <ShieldCheck size={160} strokeWidth={1} className="text-white/20" />
                    </div>
                </div>

            </main>
        </div>
    );
}