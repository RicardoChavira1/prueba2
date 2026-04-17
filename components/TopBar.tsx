// components/TopBar.tsx
import React from 'react';
import Link from 'next/link';
import { Truck } from 'lucide-react'; // Icono de camioncito para logística

export default function TopBar() {
    return (
        // Utilizamos el verde oscuro de DONNI para contrastar con el Header blanco
        <div className="bg-[#115e3b] text-white text-xs py-1.5 w-full">
            <div className="container mx-auto px-6 max-w-7xl flex justify-center md:justify-end items-center">

                {/* Enlace de Logística (Punto 4.1) */}
                <Link
                    href="/logistica"
                    className="flex items-center space-x-2 hover:text-[#D48960] transition-colors duration-200 group"
                >
                    <Truck size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                    <span className="font-medium tracking-wide uppercase">Información de Envíos y Logística</span>
                </Link>

            </div>
        </div>
    );
}