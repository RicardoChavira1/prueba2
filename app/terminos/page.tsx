'use client';

import React from 'react';
import { FileText, Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TerminosPage() {
    const handlePrint = () => {
        window.print(); // Función nativa del navegador para guardar como PDF o imprimir
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
                        <FileText size={32} className="mr-4 text-[#D48960]" />
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Condiciones de Uso</h1>
                    </div>

                    <p className="text-sm text-slate-400 font-bold mb-10 uppercase tracking-widest border-b border-slate-100 pb-4">
                        Última actualización: {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
                    </p>

                    <div className="space-y-8 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-[#115e3b] mb-3">1. Aceptación de los Términos</h2>
                            <p>Al acceder y utilizar DONNI (el "Sitio") y nuestros servicios de e-commerce y educación botánica, usted acepta estar sujeto a estas Condiciones de Uso. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestros servicios.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#115e3b] mb-3">2. Venta de Seres Vivos y Garantía Botánica</h2>
                            <p>DONNI comercializa plantas, las cuales son organismos vivos sujetos a variaciones naturales en tamaño, forma y color. Las fotografías del catálogo son ilustrativas.</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Garantía de Llegada:</strong> Garantizamos que su planta llegará en condiciones óptimas y saludables. Si la planta llega dañada por cuestiones de logística, DONNI la reemplazará sin costo si se reporta en las primeras 48 horas.</li>
                                <li><strong>Responsabilidad de Cuidado:</strong> Una vez entregada en óptimas condiciones, la supervivencia de la planta depende del cuidado del usuario. DONNI proporciona las herramientas y la "Educación Botánica" necesaria, pero no asume responsabilidad por la pérdida de la planta derivada de negligencia, exceso de riego, plagas posteriores o falta de luz.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#115e3b] mb-3">3. Propiedad Intelectual y Academia</h2>
                            <p>Todo el contenido educativo, fichas técnicas, algoritmos de riego, diagnósticos de IA y material visual disponible en la "Educación Botánica" y la plataforma DONNI son propiedad exclusiva de DONNI o de sus respectivos autores. Queda estrictamente prohibida su reproducción, distribución o uso comercial sin autorización expresa.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#115e3b] mb-3">4. Cuentas y Membresías</h2>
                            <p>Al crear una cuenta o suscribirse a un plan Premium en DONNI, usted es responsable de mantener la confidencialidad de su cuenta y contraseña. DONNI se reserva el derecho de rechazar el servicio, cancelar cuentas o cancelar pedidos a su entera discreción si se detecta un uso fraudulento.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#115e3b] mb-3">5. Modificaciones del Servicio y Precios</h2>
                            <p>Los precios de nuestros productos botánicos están sujetos a cambios sin previo aviso. Nos reservamos el derecho de modificar o discontinuar el Servicio (o cualquier parte del contenido) en cualquier momento.</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}