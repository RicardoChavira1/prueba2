import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        // Usamos el verde institucional de DONNI
        <footer className="bg-[#115e3b] text-white/80 py-8 border-t-[6px] border-[#D48960]">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* BLOQUE SUPERIOR: Columnas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Columna 1: Logo, Eslogan y Descripción */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-3 mb-6 group inline-flex">
                            <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg">
                                <Image
                                    src="/logo.jpeg"
                                    alt="Donni Logo"
                                    fill
                                    className="object-contain p-1"
                                    sizes="48px"
                                />
                            </div>
                            <div>
                                <h4 className="text-3xl font-black font-sans text-white tracking-tight">DONNI</h4>
                                {/* Eslogan añadido */}
                                <p className="text-[#D48960] text-xs font-bold uppercase tracking-widest">Las plantas son clave para la vida.</p>
                            </div>
                        </Link>
                        <p className="max-w-md text-sm leading-relaxed text-white/70">
                            Transformando el sector botánico a través de la educación y tecnología. En DONNI, no solo adquieres una planta, aseguras su éxito y crecimiento continuo.
                        </p>
                    </div>

                    {/* Columna 2: Navegación */}
                    <div>
                        <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Explorar</h5>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/" className="hover:text-white transition-colors flex items-center group"><span className="w-2 h-0.5 bg-[#D48960] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Inicio</Link></li>
                            <li><Link href="/marketplace" className="hover:text-white transition-colors flex items-center group"><span className="w-2 h-0.5 bg-[#D48960] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Marketplace</Link></li>
                            <li><Link href="/educacion-botanica" className="hover:text-white transition-colors flex items-center group"><span className="w-2 h-0.5 bg-[#D48960] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Educación Botánica</Link></li>
                            <li><Link href="/nosotros" className="hover:text-white transition-colors flex items-center group"><span className="w-2 h-0.5 bg-[#D48960] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Nosotros</Link></li>
                            <li><Link href="/educacion-botanica" className="hover:text-white transition-colors flex items-center group"><span className="w-2 h-0.5 bg-[#D48960] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Educación Botánica</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3: Redes Sociales */}
                    <div>
                        <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Comunidad</h5>
                        <div className="flex flex-wrap gap-4 items-center">

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/donni_mexico/"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D48960] hover:text-white transition-all duration-300"
                                aria-label="Síguenos en Instagram"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            </a>

                            {/* YouTube (Añadido) */}
                            <a
                                href="https://www.youtube.com/@rosquetobey_1"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all duration-300"
                                aria-label="Síguenos en YouTube"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                </svg>
                            </a>

                            {/* TikTok (Añadido) */}
                            <a
                                href="https://www.tiktok.com/@rosqueto.bey?_r=1&_t=ZS-95jASYwbX9g"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#000000] hover:text-white transition-all duration-300"
                                aria-label="Síguenos en TikTok"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>

                            {/* Facebook (Próximamente) */}
                            <div
                                title="Próximamente"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 cursor-not-allowed transition-all duration-300"
                                aria-label="Facebook próximamente"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </div>

                        </div>
                    </div>
                </div>

                {/* BLOQUE INFERIOR: Copyright y Legales*/}
                <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 font-medium">
                    <p className="mb-4 md:mb-0">© {new Date().getFullYear()} DONNI. Todos los derechos reservados.</p>

                    {/* Smart-text de legales */}
                    <div className="flex items-center space-x-6">
                        <Link href="/privacidad" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                            Aviso de Privacidad
                        </Link>
                        <Link href="/terminos" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                            Condiciones de Uso
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}