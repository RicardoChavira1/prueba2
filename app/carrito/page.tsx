'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingCart, Search, Menu, X, ChevronLeft, Trash2, 
  Plus, Minus, CreditCard, Truck, ShieldCheck, 
  ArrowRight, Info 
} from 'lucide-react';

// --- INTERFACES ---
interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
    instanceId: number;
}

interface GrupoCarrito extends CartItem {
    cantidad: number;
    instancias: number[];
}

export default function App() {
    // --- ESTADOS ---
    const [carrito, setCarrito] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    // --- MANEJO DE HIDRATACIÓN Y CARGA ---
    useEffect(() => {
        setIsMounted(true);
        const carritoGuardado = localStorage.getItem('donni-cart');
        if (carritoGuardado) {
            try {
                const parsed = JSON.parse(carritoGuardado);
                if (Array.isArray(parsed)) {
                    // Limpiamos los precios para asegurar que sean números
                    const cleaned = parsed.map(item => ({
                        ...item,
                        precio: Number(item.precio) || 0
                    }));
                    setCarrito(cleaned);
                }
            } catch (e) {
                console.error("Error al cargar el carrito");
            }
        }
    }, []);

    // Sincronización con LocalStorage cada vez que el carrito cambie
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('donni-cart', JSON.stringify(carrito));
            // Disparar evento para que otros componentes (como el Header) se enteren
            window.dispatchEvent(new Event('storage'));
        }
    }, [carrito, isMounted]);

    // --- LÓGICA DE AGRUPACIÓN (Para mostrar en la lista) ---
    const itemsAgrupados = useMemo(() => {
        const grupos: Record<number, GrupoCarrito> = {};
        carrito.forEach((item) => {
            if (!grupos[item.id]) {
                grupos[item.id] = { ...item, cantidad: 0, instancias: [] };
            }
            grupos[item.id].cantidad += 1;
            grupos[item.id].instancias.push(item.instanceId);
        });
        return Object.values(grupos);
    }, [carrito]);

    // --- CÁLCULOS DINÁMICOS (Súper robustos) ---
    // Calculamos el subtotal basándonos en cada item individual del array de carrito
    const subtotal = useMemo(() => {
        return carrito.reduce((acc, item) => acc + (Number(item.precio) || 0), 0);
    }, [carrito]);

    const envio = subtotal >= 1500 || subtotal === 0 ? 0 : 150;
    const total = subtotal + envio;

    // --- ACCIONES DEL CARRITO ---
    const modificarCantidad = (producto: GrupoCarrito, delta: number) => {
        if (delta > 0) {
            // AGREGAR: Creamos una nueva instancia única para que el carrito crezca
            const nuevoItem: CartItem = { 
                id: producto.id,
                nombre: producto.nombre,
                precio: Number(producto.precio),
                categoria: producto.categoria,
                imagen: producto.imagen,
                instanceId: Date.now() + Math.random() 
            };
            setCarrito(prev => [...prev, nuevoItem]);
        } else {
            // QUITAR: Buscamos el último que coincida con el ID y lo removemos
            setCarrito(prev => {
                const index = prev.findLastIndex(item => item.id === producto.id);
                if (index > -1) {
                    const nuevoArray = [...prev];
                    nuevoArray.splice(index, 1);
                    return nuevoArray;
                }
                return prev;
            });
        }
    };

    const eliminarProductoCompleto = (id: number) => {
        setCarrito(prev => prev.filter(item => item.id !== id));
    };

    const vaciarCarrito = () => {
        if(confirm("¿Deseas vaciar tu carrito?")) {
            setCarrito([]);
        }
    };

    // --- RENDERIZADO SEGURO ---
    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-[#D48960]/30 text-slate-800">
            
            {/* HEADER */}
            <header className="bg-[#1a401f] text-white shadow-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href="/"}>
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold">D</div>
                        <h1 className="text-2xl font-bold tracking-tighter font-serif">DONNI</h1>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="w-full relative">
                            <input 
                                type="text" 
                                placeholder="Buscar en el catálogo..." 
                                className="w-full bg-white/10 border border-white/20 rounded-full py-2 px-10 text-sm focus:bg-white focus:text-[#1a401f] outline-none transition-all placeholder:text-white/40"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-white/40" size={16} />
                        </div>
                    </div>

                    <div className="flex items-center space-x-5">
                        <a href="/carrito" className="relative text-[#D48960] p-2">
                            <ShoppingCart size={22} />
                            {carrito.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#D48960] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#1a401f]">
                                    {carrito.length}
                                </span>
                            )}
                        </a>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 grow">
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* LISTA DE PRODUCTOS */}
                    <div className="grow">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-[#1a401f]">Tu Carrito</h2>
                            {carrito.length > 0 && (
                                <button onClick={vaciarCarrito} className="text-xs font-bold text-red-400 hover:text-red-600 uppercase tracking-widest">
                                    Vaciar todo
                                </button>
                            )}
                        </div>

                        {itemsAgrupados.length > 0 ? (
                            <div className="space-y-4">
                                {itemsAgrupados.map((item) => (
                                    <div key={item.id} className="bg-white rounded-4xl p-6 border border-slate-100 shadow-sm flex items-center gap-6 group">
                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shrink-0">
                                            <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase text-[#D48960] tracking-widest">{item.categoria}</span>
                                                    <h3 className="font-bold text-xl text-[#1a401f] leading-tight mt-0.5">{item.nombre}</h3>
                                                </div>
                                                <button onClick={() => eliminarProductoCompleto(item.id)} className="text-slate-200 hover:text-red-500 p-2">
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-6">
                                                <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-100">
                                                    <button onClick={() => modificarCantidad(item, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl text-[#1a401f] shadow-sm"><Minus size={14} /></button>
                                                    <span className="w-12 text-center font-black">{item.cantidad}</span>
                                                    <button onClick={() => modificarCantidad(item, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl text-[#1a401f] shadow-sm"><Plus size={14} /></button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Total Item</p>
                                                    <p className="font-black text-2xl text-[#1a401f] tracking-tighter" key={item.cantidad}>
                                                        ${(item.precio * item.cantidad).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
                                <h3 className="text-2xl font-bold text-[#1a401f]">Tu carrito está vacío</h3>
                                <a href="/marketplace" className="mt-8 inline-block bg-[#1a401f] text-white px-10 py-4 rounded-3xl font-bold">Explorar Marketplace</a>
                            </div>
                        )}
                    </div>

                    {/* PANEL DE PAGO */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 sticky top-28 text-[#1a401f]">
                            <h3 className="text-xl font-black mb-8 flex items-center">
                                <ShieldCheck className="mr-2 text-[#D48960]" size={20} /> Resumen de Compra
                            </h3>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between font-bold text-sm uppercase">
                                    <span className="text-slate-500">Subtotal</span>
                                    {/* La key={subtotal} obliga al navegador a re-renderizar este texto */}
                                    <span key={`sub-${subtotal}`}>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-sm uppercase">
                                    <span className="text-slate-500">Envío</span>
                                    <span key={`env-${envio}`}>
                                        {envio === 0 ? <span className="text-emerald-500">¡Gratis!</span> : `$${envio.toFixed(2)}`}
                                    </span>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 mb-8"></div>

                            <div className="mb-10">
                                <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1 tracking-widest">Total a pagar</span>
                                <span className="text-5xl font-black tracking-tighter tabular-nums" key={`total-${total}`}>
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <button 
                                onClick={() => alert("Procesando pago...")}
                                disabled={carrito.length === 0}
                                className="w-full bg-[#1a401f] text-white py-6 rounded-4xl font-black text-lg shadow-xl hover:bg-[#265c2c] transition-all flex items-center justify-center gap-3"
                            >
                                <CreditCard size={22} /> Pagar Ahora
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}