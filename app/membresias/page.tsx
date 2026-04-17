import React from 'react';
import { Check, Lock, Sparkles, Sprout } from 'lucide-react';

export default function Memberships() {
    return (
        <section className="py-20 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Encabezado de la sección */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-[#1a401f] tracking-tight mb-4">
                        Crece junto con tus plantas
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Únete a nuestra comunidad. Elige el plan que mejor se adapte a tu nivel de experiencia botánica.
                    </p>
                </div>

                {/* Contenedor Grid para las 2 Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                    {/* TARJETA 1: PLAN ACTUAL (FREE) */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
                        <div className="mb-8">
                            <div className="w-12 h-12 bg-[#1a401f]/10 rounded-2xl flex items-center justify-center text-[#1a401f] mb-6">
                                <Sprout size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-[#1a401f] mb-2">Brote (Gratis)</h3>
                            <p className="text-slate-500 text-sm">Perfecto para iniciar tu colección y aprender lo básico.</p>
                        </div>

                        <div className="text-4xl font-black text-[#1a401f] mb-8">
                            $0 <span className="text-base font-medium text-slate-400">/mes</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {[
                                "Acceso completo al Marketplace",
                                "Fichas técnicas básicas de cuidados",
                                "Historial de compras y pedidos",
                                "Garantía logística en envíos"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start text-sm text-slate-600 font-medium">
                                    <Check size={18} className="text-emerald-500 mr-3 shrink-0 mt-0.5" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button className="w-full bg-slate-100 text-slate-400 py-4 rounded-xl font-bold cursor-default">
                            Plan Actual
                        </button>
                    </div>

                    {/* TARJETA 2: PLAN PREMIUM (PRÓXIMAMENTE) */}
                    <div className="bg-[#1a401f] rounded-[2rem] p-8 md:p-10 border border-[#265c2c] shadow-2xl relative flex flex-col overflow-hidden group">
                        {/* Efecto de brillo de fondo */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D48960]/20 rounded-full blur-3xl -mr-20 -mt-20"></div>

                        {/* Etiqueta flotante */}
                        <div className="absolute top-6 right-6 bg-[#D48960] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                            Próximamente
                        </div>

                        <div className="mb-8 relative z-10">
                            <div className="w-12 h-12 bg-[#D48960]/20 rounded-2xl flex items-center justify-center text-[#D48960] mb-6">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">Comunidad Premium</h3>
                            <p className="text-white/60 text-sm">Más servicios para ti. Lleva tu selva urbana al siguiente nivel.</p>
                        </div>

                        <div className="text-4xl font-black text-white mb-8 relative z-10 flex items-center gap-3">
                            <Lock size={28} className="text-white/30" />
                        </div>

                        <ul className="space-y-4 mb-8 flex-grow relative z-10">
                            {[
                                "Diagnóstico fotográfico con IA",
                                "Chat directo con expertos botánicos",
                                "Preventa de especies raras o exóticas",
                                "Descuentos exclusivos en envíos",
                                "Foro privado de la comunidad DONNI"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start text-sm text-white/70 font-medium">
                                    <Check size={18} className="text-[#D48960] mr-3 shrink-0 mt-0.5" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button disabled className="w-full bg-[#D48960] text-white py-4 rounded-xl font-bold opacity-80 cursor-not-allowed transition-all relative z-10 flex items-center justify-center gap-2">
                            <Lock size={16} /> Proximamente disponible para ti
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}