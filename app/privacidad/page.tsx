'use client';

import React from 'react';
import { ShieldCheck, Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacidadPage() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans text-slate-800 py-12">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Navegación y Acciones */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <Link href="/" className="flex items-center text-[#115e3b] hover:text-[#D48960] font-bold transition-colors">
                        <ArrowLeft size={18} className="mr-2" /> Volver a DONNI
                    </Link>
                    <button
                        onClick={handlePrint}
                        className="flex items-center bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 hover:text-[#115e3b] transition-all shadow-sm"
                    >
                        <Printer size={16} className="mr-2" /> Guardar como PDF
                    </button>
                </div>

                {/* Contenedor del Documento */}
                <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-sm border border-slate-100">
                    <div className="flex items-center mb-8 text-[#115e3b]">
                        <ShieldCheck size={32} className="mr-4 text-emerald-500" />
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Aviso de Privacidad</h1>
                    </div>

                    <p className="text-sm text-slate-400 font-bold mb-10 uppercase tracking-widest border-b border-slate-100 pb-4">
                        Última actualización: {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
                    </p>

                    <div className="space-y-8 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-[#115e3b] mb-3">1. Información que Recopilamos</h2>
                            <p>En DONNI, valoramos la privacidad de su información personal. Recopilamos las siguientes categorías de datos:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Información de Contacto y Envío:</strong> Nombre, dirección, correo electrónico y número de teléfono necesarios para la logística y entrega segura de sus plantas.</li>
                                <li><strong>Datos de Pago:</strong> La información de su tarjeta de crédito es encriptada y procesada a través de pasarelas de pago seguras de terceros. DONNI no almacena su información financiera.</li>
                                <li><strong>Imágenes Botánicas (Diagnóstico IA):</strong> Las fotografías de plantas que usted suba voluntariamente a nuestra plataforma para utilizar el servicio de "Diagnóstico con IA" serán utilizadas exclusivamente para analizar la salud de la planta y mejorar nuestros algoritmos de botánica computacional.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#115e3b] mb-3">2. Uso de su Información</h2>
                            <p>Utilizamos sus datos personales para:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>Procesar sus pedidos y coordinar la logística de envío.</li>
                                <li>Proveerle acceso a la "Educación Botánica" y a su historial de "Mis Pedidos".</li>
                                <li>Enviarle guías de riego, alertas de cuidado estacional y actualizaciones de servicio.</li>
                                <li>Mejorar nuestra plataforma y personalizar sus recomendaciones de especies botánicas.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#115e3b] mb-3">3. Protección y Retención de Datos</h2>
                            <p>Mantenemos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra el acceso no autorizado, la alteración o la destrucción. Retendremos su información solo durante el tiempo que sea necesario para cumplir con los fines detallados en este aviso o según lo exija la ley.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#115e3b] mb-3">4. Compartir Información con Terceros</h2>
                            <p>DONNI no vende ni alquila su información personal a terceros. Solo compartimos los datos estrictamente necesarios con nuestros socios de logística (paqueterías) para garantizar la entrega segura de sus productos.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#115e3b] mb-3">5. Sus Derechos</h2>
                            <p>Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, o si tiene dudas sobre nuestro Aviso de Privacidad, por favor contáctenos a través de nuestro soporte oficial.</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}