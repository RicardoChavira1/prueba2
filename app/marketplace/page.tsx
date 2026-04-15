'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  CheckCircle,
  Eye,
  Loader2,
  Star,
  Plus
} from 'lucide-react';

// --- DATOS LOCALES INTEGRADOS (Sincronizados con el resto de la app) ---
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
  { "id": 11, "nombre": "Aloe Vera", "nombreCientifico": "Aloe barbadensis miller", "precio": 180, "categoria": "Resistente", "imagen": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800", "cuidados": { "riego": "Bajo (Cada 21 días)", "luz": "Luz directa o muy brillante", "dificultad": "Fácil", "humedad": "Baja", "toxicidad": "Tóxica para mascotas si se ingiere" }, "descripcion": "Famosa por sus propiedades medicinales y su gel cicatrizante. Una planta esencial en cualquier hogar." },
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
    const [plantas, setPlantas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [carrito, setCarrito] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('relevancia');
    const [notificacion, setNotificacion] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setPlantas(plantasData);
        setLoading(false);

        const saved = localStorage.getItem('donni-cart');
        if (saved) {
            try {
                setCarrito(JSON.parse(saved));
            } catch (e) {
                console.error("Error cargando carrito");
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('donni-cart', JSON.stringify(carrito));
            window.dispatchEvent(new Event('storage'));
        }
    }, [carrito, isMounted]);

    const filteredProducts = useMemo(() => {
        let result = plantas.filter(p => 
            p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.nombreCientifico.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (sortBy === 'precio-asc') result.sort((a, b) => a.precio - b.precio);
        if (sortBy === 'precio-desc') result.sort((a, b) => b.precio - a.precio);
        return result;
    }, [plantas, searchTerm, sortBy]);

    const agregarAlCarrito = (producto: any) => {
        const nuevoItem: CartItem = { 
            ...producto, 
            instanceId: Date.now() + Math.random() 
        };
        setCarrito(prev => [...prev, nuevoItem]);
        setNotificacion(`¡${producto.nombre} añadido!`);
        setTimeout(() => setNotificacion(null), 3000);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#D48960]/30 text-slate-800">
            {notificacion && (
                <div className="fixed bottom-8 right-8 z-[100] bg-[#1a401f] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce border-l-4 border-[#D48960]">
                    <CheckCircle size={20} className="text-[#D48960]" />
                    <span className="font-medium uppercase text-xs tracking-widest">{notificacion}</span>
                </div>
            )}

            <header className="bg-[#1a401f] text-white shadow-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white">D</div>
                        <h1 className="text-2xl font-bold tracking-tighter font-serif">DONNI</h1>
                    </a>
                    <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
                        <input 
                            type="text" 
                            placeholder="Buscar especie..." 
                            className="w-full bg-white/10 border border-white/20 rounded-full py-2 px-10 text-sm focus:bg-white focus:text-[#1a401f] outline-none transition-all placeholder:text-white/40"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-white/40" size={16} />
                    </div>
                    <a href="/carrito" className="relative p-2 rounded-full hover:bg-white/10 transition-all">
                        <ShoppingCart size={22} />
                        {carrito.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#D48960] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#1a401f]">
                                {carrito.length}
                            </span>
                        )}
                    </a>
                </div>
            </header>

            <main className="grow container mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl p-6 shadow-sm mb-8 border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-[#1a401f] font-serif tracking-tight">Marketplace Consciente</h2>
                        <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mt-1">Especies seleccionadas | Base de datos local</p>
                    </div>
                    <select 
                        className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-xs font-black uppercase outline-none focus:ring-2 focus:ring-[#1a401f]/20"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="relevancia">Relevancia</option>
                        <option value="precio-asc">Precio: Bajo a Alto</option>
                        <option value="precio-desc">Precio: Alto a Bajo</option>
                    </select>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="animate-spin text-[#D48960] mb-4" size={48} />
                        <p className="font-bold text-slate-400 uppercase text-xs tracking-widest">Sincronizando catálogo...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map(p => (
                            <div key={p.id} className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                                {/* IMPORTANTE: Usamos <a> para evitar errores de compilación con Link en Canvas */}
                                <a href={`/marketplace/${p.id}`} className="relative h-72 overflow-hidden bg-slate-100 block cursor-pointer">
                                    <img 
                                        src={p.imagen} 
                                        alt={p.nombre} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                    />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-[#1a401f] shadow-sm">
                                        {p.categoria}
                                    </div>
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white text-[#1a401f] px-6 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                                            <Eye size={14} /> Ver Ficha
                                        </div>
                                    </div>
                                </a>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center text-amber-400 mb-3">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                        <span className="text-[9px] font-black ml-2 text-slate-300 uppercase">Verificada</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1a401f] leading-tight font-serif h-14 line-clamp-2">
                                        {p.nombre}
                                    </h3>
                                    <p className="text-[10px] italic text-slate-400 mb-6 truncate">{p.nombreCientifico}</p>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                                        <div>
                                            <span className="text-[10px] text-slate-300 font-bold uppercase block mb-1">Inversión</span>
                                            <span className="text-2xl font-black text-[#1a401f] tracking-tighter">${p.precio}</span>
                                        </div>
                                        <button 
                                            onClick={() => agregarAlCarrito(p)}
                                            className="w-14 h-14 rounded-2xl bg-[#1a401f] text-white hover:bg-[#D48960] transition-all flex items-center justify-center shadow-lg shadow-[#1a401f]/10 active:scale-90"
                                        >
                                            <Plus size={22} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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