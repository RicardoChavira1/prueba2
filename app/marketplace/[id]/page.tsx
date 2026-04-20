'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    ShoppingCart,
    ChevronLeft,
    Star,
    Droplets,
    Sun,
    Truck,
    CheckCircle,
    Plus,
    Minus,
    Heart,
    Share2,
    Info,
    Loader2,
    BookOpen,
    Sprout,
    ShieldAlert,
    Wind,
    Dna
} from 'lucide-react';

// --- DATOS LOCALES INTEGRADOS (Sincronizados exactamente con Marketplace) ---
const plantasData = [
    { "id": 1, "nombre": "Monstera Deliciosa", "nombreCientifico": "Monstera deliciosa", "precio": 450, "categoria": "Interior", "imagen": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Moderado (Cada 7-10 días)", "luz": "Luz indirecta brillante", "dificultad": "Fácil", "humedad": "Alta", "toxicidad": "Tóxica para mascotas" }, "descripcion": "La reina del interiorismo. Sus hojas con agujeros naturales aportan un aire selvático y elegante a cualquier espacio." },
    { "id": 2, "nombre": "Sansevieria", "nombreCientifico": "Dracaena trifasciata", "precio": 280, "categoria": "Resistente", "imagen": "https://images.unsplash.com/photo-1593433561991-325519804035?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Bajo (Cada 15-20 días)", "luz": "Soporta poca luz a sol directo", "dificultad": "Muy Fácil", "humedad": "Baja", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Casi indestructible. Ideal para purificar el aire y perfecta para quienes olvidan regar sus plantas." },
    { "id": 3, "nombre": "Poto (Epipremnum)", "nombreCientifico": "Epipremnum aureum", "precio": 190, "categoria": "Colgante", "imagen": "https://images.unsplash.com/photo-1597055181300-e3633a207519?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Moderado (Sustrato seco al tacto)", "luz": "Media (Luz indirecta)", "dificultad": "Fácil", "humedad": "Media", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Una planta colgante de crecimiento rápido. Sus hojas en forma de corazón con tonos dorados son un clásico." },
    { "id": 4, "nombre": "Echeveria Blue", "nombreCientifico": "Echeveria elegans", "precio": 120, "categoria": "Suculenta", "imagen": "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Muy bajo (Solo cuando el suelo esté seco)", "luz": "Sol directo", "dificultad": "Fácil", "humedad": "Baja", "toxicidad": "Segura para mascotas" }, "descripcion": "Pequeña suculenta en forma de roseta con un tono azulado cerúleo. Perfecta para escritorios con mucha luz." },
    { "id": 5, "nombre": "Ficus Lyrata", "nombreCientifico": "Ficus lyrata", "precio": 850, "categoria": "Interior", "imagen": "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Estructural (No encharcar)", "luz": "Indirecta muy brillante", "dificultad": "Media", "humedad": "Alta", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Conocida como Higuera de hoja de violín. Es una pieza de declaración por sus enormes y brillantes hojas verdes." },
    { "id": 6, "nombre": "Cactus de Asiento", "nombreCientifico": "Echinocactus grusonii", "precio": 320, "categoria": "Exterior", "imagen": "https://images.unsplash.com/photo-1520412099561-648319783e74?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Mínimo (Casi nulo en invierno)", "luz": "Pleno sol", "dificultad": "Muy Fácil", "humedad": "Muy baja", "toxicidad": "Segura (pero cuidado con espinas)" }, "descripcion": "Un cactus globular icónico con espinas amarillas brillantes. Aporta una textura desértica única." },
    { "id": 7, "nombre": "Helecho Boston", "nombreCientifico": "Nephrolepis exaltata", "precio": 250, "categoria": "Humedad", "imagen": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Frecuente (Suelo siempre húmedo)", "luz": "Sombra o luz tamizada", "dificultad": "Media", "humedad": "Muy Alta", "toxicidad": "Segura para mascotas" }, "descripcion": "Sus frondas arqueadas y plumosas son perfectas para colgar en baños o zonas con alta humedad ambiental." },
    { "id": 8, "nombre": "Palma Areca", "nombreCientifico": "Dypsis lutescens", "precio": 580, "categoria": "Interior", "imagen": "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Regular (2 veces por semana)", "luz": "Brillante indirecta", "dificultad": "Media", "humedad": "Alta", "toxicidad": "Segura para mascotas" }, "descripcion": "Excelente purificador de aire que aporta un toque tropical y elegante a salas y oficinas amplias." },
    { "id": 9, "nombre": "Lirio de la Paz", "nombreCientifico": "Spathiphyllum", "precio": 310, "categoria": "Interior", "imagen": "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Regular (Te avisa bajando sus hojas)", "luz": "Baja a Media", "dificultad": "Fácil", "humedad": "Media-Alta", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Elegante planta de flores blancas. Es muy comunicativa: si necesita agua, sus hojas se caen ligeramente." },
    { "id": 10, "nombre": "Árbol de Jade", "nombreCientifico": "Crassula ovata", "precio": 220, "categoria": "Suculenta", "imagen": "https://images.unsplash.com/photo-1509299349698-dd22303b5171?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Bajo (Cada 15 días)", "luz": "Brillante o Sol directo", "dificultad": "Fácil", "humedad": "Baja", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Simboliza la buena suerte y prosperidad. Es una suculenta arbustiva de hojas gruesas y carnosas." },
    { "id": 11, "nombre": "Aloe Vera", "nombreCientifico": "Aloe barbadensis miller", "precio": 180, "categoria": "Resistente", "imagen": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Bajo (Cada 21 días)", "luz": "Luz directa o muy brillante", "dificultad": "Fácil", "humedad": "Baja", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Famosa por sus propiedades medicinales y su gel cicatrizante. Una planta esencial en cualquier hogar." },
    { "id": 12, "nombre": "Zamioculca (ZZ)", "nombreCientifico": "Zamioculcas zamiifolia", "precio": 350, "categoria": "Resistente", "imagen": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Muy bajo (Mensual)", "luz": "Soporta muy baja luz", "dificultad": "Muy Fácil", "humedad": "Indiferente", "toxicidad": "Tóxica para mascotas" }, "descripcion": "La planta perfecta para rincones oscuros. Sus hojas enceradas y oscuras crecen lentamente pero con fuerza." },
    { "id": 13, "nombre": "Cuna de Moisés", "nombreCientifico": "Spathiphyllum wallisii", "precio": 290, "categoria": "Humedad", "imagen": "https://images.unsplash.com/photo-1622321528434-df427a1f5920?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Regular (2-3 veces por semana)", "luz": "Indirecta o sombra", "dificultad": "Fácil", "humedad": "Alta", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Especie purificadora por excelencia. Sus espatas blancas contrastan maravillosamente con el verde oscuro." },
    { "id": 14, "nombre": "Drácena Marginata", "nombreCientifico": "Dracaena reflexa var. angustifolia", "precio": 410, "categoria": "Interior", "imagen": "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Moderado (Suelo seco entre riegos)", "luz": "Brillante indirecta", "dificultad": "Fácil", "humedad": "Media", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Planta de aspecto arquitectónico con hojas finas bordeadas de rojo. Muy elegante para oficinas." },
    { "id": 15, "nombre": "Croton", "nombreCientifico": "Codiaeum variegatum", "precio": 380, "categoria": "Interior", "imagen": "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Regular (No dejar secar del todo)", "luz": "Mucha luz indirecta (para mantener colores)", "dificultad": "Media", "humedad": "Alta", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Una explosión de color en el follaje: amarillos, rojos y naranjas que iluminan cualquier estancia." },
    { "id": 16, "nombre": "Peperomia Obtusifolia", "nombreCientifico": "Peperomia obtusifolia", "precio": 160, "categoria": "Interior", "imagen": "https://images.unsplash.com/photo-1620127252536-03bdfcf6d5c3?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Moderado (Semiactuosa)", "luz": "Media indirecta", "dificultad": "Fácil", "humedad": "Media", "toxicidad": "Segura para mascotas" }, "descripcion": "Compacta y carnosa. Sus hojas redondeadas son resistentes y crecen bien en espacios pequeños." },
    { "id": 17, "nombre": "Calathea Triostar", "nombreCientifico": "Stromanthe thalia", "precio": 480, "categoria": "Humedad", "imagen": "https://images.unsplash.com/photo-1534135954997-3521bbef403a?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Frecuente (Agua filtrada preferiblemente)", "luz": "Media indirecta (Evitar sol directo)", "dificultad": "Media-Alta", "humedad": "Muy Alta", "toxicidad": "Segura para mascotas" }, "descripcion": "Hojas con envés rosado y haz variegado. Se mueve durante el día siguiendo la luz (planta oradora)." },
    { "id": 18, "nombre": "Cactus de Navidad", "nombreCientifico": "Schlumbergera", "precio": 230, "categoria": "Interior", "imagen": "https://images.unsplash.com/photo-1603436326446-74e2d65f3168?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Moderado (Más agua que un cactus normal)", "luz": "Brillante indirecta", "dificultad": "Media", "humedad": "Media-Alta", "toxicidad": "Segura para mascotas" }, "descripcion": "Florece en invierno con espectaculares flores rosas o rojas. Sus tallos planos son muy decorativos." },
    { "id": 19, "nombre": "Hiedra Inglesa", "nombreCientifico": "Hedera helix", "precio": 210, "categoria": "Colgante", "imagen": "https://images.unsplash.com/photo-1544336307-28d1bcc97940?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Moderado (Pulverizar agua)", "luz": "Baja a Brillante", "dificultad": "Fácil", "humedad": "Media", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Planta trepadora o colgante clásica. Ayuda a limpiar el moho del aire y crece de forma vigorosa." },
    { "id": 20, "nombre": "Maguey Morado", "nombreCientifico": "Tradescantia spathacea", "precio": 150, "categoria": "Resistente", "imagen": "https://images.unsplash.com/photo-1632766340277-2e16d4ba4c8a?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Bajo (Soporta sequías)", "luz": "Pleno sol a media sombra", "dificultad": "Muy Fácil", "humedad": "Indiferente", "toxicidad": "Tóxica para mascotas" }, "descripcion": "Ideal para exteriores o interiores muy luminosos. El contraste morado y verde de sus hojas es impactante." }
];

interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
    instanceId: number;
}

export default function App() {
    const [id, setId] = useState<number | null>(null);
    const [planta, setPlanta] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [carrito, setCarrito] = useState<CartItem[]>([]);
    const [cantidad, setCantidad] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const [notificacion, setNotificacion] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);

        // --- DETECCIÓN DE ID DESDE LA URL (Next.js standard) ---
        const path = window.location.pathname;
        const matches = path.match(/\/marketplace\/(\d+)/);
        const currentId = matches ? Number(matches[1]) : 1;
        setId(currentId);

        // Carga de datos local basada en el ID
        const loadDetalle = () => {
            setLoading(true);
            const p = plantasData.find(item => item.id === currentId) || plantasData[0];
            setPlanta(p);
            setLoading(false);
        };

        loadDetalle();

        const saved = localStorage.getItem('donni-cart');
        if (saved) {
            try {
                setCarrito(JSON.parse(saved));
            } catch (e) {
                console.error("Error al cargar el carrito local", e);
            }
        }
    }, []);

    // Sincronización de carrito
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('donni-cart', JSON.stringify(carrito));
            window.dispatchEvent(new Event('storage'));
        }
    }, [carrito, isMounted]);

    // Función para definir estilos de dificultad dinámicos
    const getDificultadStyle = (nivel: string) => {
        if (nivel.includes('Muy Fácil')) return { color: 'text-emerald-500 bg-emerald-50', icon: <CheckCircle size={14} /> };
        if (nivel.includes('Fácil')) return { color: 'text-blue-500 bg-blue-50', icon: <Info size={14} /> };
        if (nivel.includes('Media')) return { color: 'text-amber-500 bg-amber-50', icon: <ShieldAlert size={14} /> };
        return { color: 'text-rose-500 bg-rose-50', icon: <ShieldAlert size={14} /> };
    };

    const agregarAlCarrito = () => {
        if (!planta) return;
        const nuevosItems: CartItem[] = [];
        for (let i = 0; i < cantidad; i++) {
            nuevosItems.push({
                id: planta.id,
                nombre: planta.nombre,
                precio: planta.precio,
                categoria: planta.categoria,
                imagen: planta.imagen,
                instanceId: Date.now() + Math.random()
            });
        }
        setCarrito(prev => [...prev, ...nuevosItems]);
        setNotificacion(`¡${cantidad} ${planta.nombre} añadido(s)!`);
        setTimeout(() => setNotificacion(null), 3000);
    };

    if (!isMounted) return <div className="min-h-screen bg-white" />;

    if (loading || !planta) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <Loader2 className="animate-spin text-[#1a401f]" size={48} />
            <p className="font-serif italic text-slate-400 text-lg animate-pulse text-center px-4">
                Sincronizando archivos biológicos de DONNI...
            </p>
        </div>
    );

    const difStyle = getDificultadStyle(planta.cuidados.dificultad);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-[#D48960]/30">

            {notificacion && (
                <div className="fixed bottom-8 right-8 z-[100] bg-[#1a401f] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce border-l-4 border-[#D48960]">
                    <CheckCircle size={20} className="text-[#D48960]" />
                    <span className="font-medium">{notificacion}</span>
                </div>
            )}

            <header className="bg-[#1a401f] text-white shadow-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href = "/"}>
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold">D</div>
                        <h1 className="text-2xl font-bold font-serif uppercase tracking-widest">DONNI</h1>
                    </div>
                    <a href="/carrito" className="relative p-2 rounded-full hover:bg-white/10 transition-all">
                        <ShoppingCart size={22} />
                        {carrito.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#D48960] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#1a401f]">
                                {carrito.reduce((acc, i) => acc + 1, 0)}
                            </span>
                        )}
                    </a>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 md:py-12">
                <a href="/marketplace" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-[#1a401f] mb-10 transition-colors group">
                    <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Volver al Marketplace
                </a>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    <div className="space-y-6">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl group relative">
                            <img
                                src={planta.imagen}
                                alt={planta.nombre}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute top-6 left-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg backdrop-blur-md ${difStyle.color}`}>
                                    {difStyle.icon} Dificultad {planta.cuidados.dificultad}
                                </span>
                            </div>
                        </div>

                        <div className="bg-[#f3f7f3] p-8 rounded-3xl border border-[#1a401f]/5 shadow-sm">
                            <h4 className="flex items-center font-black text-[#1a401f] mb-6 gap-2 uppercase text-[10px] tracking-widest">
                                <Dna size={14} className="text-[#D48960]" /> Registro Biológico
                            </h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end border-b border-[#1a401f]/10 pb-2">
                                    <p className="text-slate-400 text-xs font-bold uppercase">Nombre Científico</p>
                                    <p className="text-[#1a401f] italic font-serif text-sm font-medium">{planta.nombreCientifico}</p>
                                </div>
                                <div className="flex justify-between items-end border-b border-[#1a401f]/10 pb-2">
                                    <p className="text-slate-400 text-xs font-bold uppercase">Categoría</p>
                                    <p className="text-[#1a401f] font-medium text-sm">{planta.categoria}</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <p className="text-slate-400 text-xs font-bold uppercase">Toxicidad</p>
                                    <p className="text-[#1a401f] font-bold text-sm uppercase tracking-wider">{planta.cuidados.toxicidad}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="mb-8 text-center lg:text-left">
                            <h2 className="text-5xl md:text-7xl font-black text-[#1a401f] leading-none mb-6 font-serif tracking-tight">
                                {planta.nombre}
                            </h2>
                            <div className="flex items-center justify-center lg:justify-start gap-6 mb-8">
                                <span className="text-5xl font-black text-[#1a401f] tracking-tighter tabular-nums">
                                    ${planta.precio}
                                </span>
                                <div className="h-10 w-px bg-slate-200"></div>
                                <div className="flex flex-col text-left">
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">Especie Certificada</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-10">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center group hover:bg-[#1a401f] transition-all duration-300">
                                <Droplets className="text-blue-500 mb-3 group-hover:text-white" size={28} />
                                <p className="text-[9px] font-black uppercase text-slate-400 group-hover:text-white/60 mb-1">Riego</p>
                                <p className="text-[10px] font-black text-[#1a401f] group-hover:text-white uppercase tracking-tighter leading-tight">
                                    {planta.cuidados.riego}
                                </p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center group hover:bg-[#1a401f] transition-all duration-300">
                                <Sun className="text-amber-500 mb-3 group-hover:text-white" size={28} />
                                <p className="text-[9px] font-black uppercase text-slate-400 group-hover:text-white/60 mb-1">Luz</p>
                                <p className="text-[10px] font-black text-[#1a401f] group-hover:text-white uppercase leading-tight">
                                    {planta.cuidados.luz}
                                </p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center group hover:bg-[#1a401f] transition-all duration-300">
                                <Sprout className="text-emerald-500 mb-3 group-hover:text-white" size={28} />
                                <p className="text-[9px] font-black uppercase text-slate-400 group-hover:text-white/60 mb-1">Humedad</p>
                                <p className="text-[10px] font-black text-[#1a401f] group-hover:text-white uppercase leading-tight">
                                    {planta.cuidados.humedad}
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#1a401f] text-white p-10 rounded-3xl mb-12 shadow-2xl shadow-[#1a401f]/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <BookOpen size={80} />
                            </div>
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                <Info size={20} className="text-[#D48960]" /> Perfil de la Especie
                            </h3>
                            <p className="text-sm text-white/80 leading-relaxed italic font-medium">
                                {planta.descripcion}
                            </p>
                        </div>

                        <div className="mt-auto">
                            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                                <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-full sm:w-auto justify-between">
                                    <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="p-4 hover:bg-white rounded-xl transition-all shadow-sm"><Minus size={20} /></button>
                                    <span className="w-16 text-center font-black text-3xl tabular-nums px-4">{cantidad}</span>
                                    <button onClick={() => setCantidad(cantidad + 1)} className="p-4 hover:bg-white rounded-xl transition-all shadow-sm"><Plus size={20} /></button>
                                </div>
                                <button
                                    onClick={agregarAlCarrito}
                                    className="grow w-full bg-[#1a401f] text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-[#265c2c] active:scale-95 transition-all flex items-center justify-center gap-4"
                                >
                                    <ShoppingCart size={24} /> Añadir al Carrito
                                </button>
                            </div>
                            <div className="flex justify-between items-center px-4">
                                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <Truck size={16} className="text-[#D48960]" /> Entrega Segura 48h
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <ShieldAlert size={16} className="text-[#D48960]" /> Garantía Botánica
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 pt-24 border-t border-slate-100">
                    <div className="max-w-4xl">
                        <h3 className="text-4xl font-black text-[#1a401f] mb-4 font-serif">Protocolo de Cuidado Wiki-DONNI</h3>
                        <p className="text-slate-400 font-medium mb-12">Instrucciones precisas para que tu {planta.nombre} prospere en casa.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="group p-8 rounded-3xl border border-transparent hover:border-slate-100 transition-all">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm"><Droplets size={32} /></div>
                            <h4 className="font-bold text-2xl text-[#1a401f] mb-4">Hidratación</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                Esta planta requiere un régimen de riego <strong>{planta.cuidados.riego}</strong>. Es vital mantener el sustrato según estas especificaciones para evitar la pudrición de raíces.
                            </p>
                        </div>
                        <div className="group p-8 rounded-3xl border border-transparent hover:border-slate-100 transition-all">
                            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500 shadow-sm"><Sun size={32} /></div>
                            <h4 className="font-bold text-2xl text-[#1a401f] mb-4">Luminosidad</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                Su necesidad de <strong>{planta.cuidados.luz}</strong> es fundamental para su crecimiento. Ubícala en un lugar que respete este parámetro para asegurar hojas vibrantes.
                            </p>
                        </div>
                        <div className="group p-8 rounded-3xl border border-transparent hover:border-slate-100 transition-all">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-sm"><Wind size={32} /></div>
                            <h4 className="font-bold text-2xl text-[#1a401f] mb-4">Mantenimiento</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                Nivel de dificultad: <strong>{planta.cuidados.dificultad}</strong>. {planta.cuidados.dificultad === 'Muy Fácil' ? 'Ideal para personas sin experiencia previa.' : 'Requiere un monitoreo más atento de su entorno biológico.'}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-[#1a401f] text-white/40 py-16 mt-20 border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold">© {new Date().getFullYear()} SEER | DONNI BOTANICS</p>
                </div>
            </footer>
        </div>
    );
}