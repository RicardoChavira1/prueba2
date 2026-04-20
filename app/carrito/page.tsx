'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // IMPORTANTE: Para redirigir al login
import { auth } from "@/app/lib/firebase"; // IMPORTANTE: Tu conexión a Firebase
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth"; // IMPORTANTE: Tipos y observador de Firebase

import {
    ShoppingCart, Search, Trash2, Plus, Minus, CreditCard,
    ShieldCheck, CheckCircle, Loader2, Info
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

export default function CarritoPage() {
    const router = useRouter(); // Inicializamos el router para cambiar de página

    // --- ESTADOS BASE ---
    const [carrito, setCarrito] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // --- ESTADO DE AUTENTICACIÓN ---
    const [user, setUser] = useState<FirebaseUser | null>(null);

    // --- ESTADOS DE LA FUNCIÓN DE PAGO ---
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // --- MANEJO DE HIDRATACIÓN Y FIREBASE ---
    useEffect(() => {
        setIsMounted(true);

        // 1. Cargamos el carrito de la memoria local
        const carritoGuardado = localStorage.getItem('donni-cart');
        if (carritoGuardado) {
            try {
                const parsed = JSON.parse(carritoGuardado);
                if (Array.isArray(parsed)) {
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

        // 2. Activamos el vigilante de Firebase
        // Esto revisa automáticamente si el usuario ya inició sesión
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Guarda los datos del usuario (o null si no hay)
        });

        // Limpiamos el vigilante si el componente se desmonta (buena práctica)
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('donni-cart', JSON.stringify(carrito));
            window.dispatchEvent(new Event('storage'));
        }
    }, [carrito, isMounted]);

    // --- LÓGICA DE AGRUPACIÓN ---
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

    // --- CÁLCULOS DINÁMICOS ---
    const subtotal = useMemo(() => {
        return carrito.reduce((acc, item) => acc + (Number(item.precio) || 0), 0);
    }, [carrito]);

    const envio = subtotal >= 1500 || subtotal === 0 ? 0 : 150;
    const garantia = subtotal > 0 ? 49 : 0;
    const total = subtotal + envio + garantia;

    // --- ACCIONES DEL CARRITO ---
    const modificarCantidad = (producto: GrupoCarrito, delta: number) => {
        if (delta > 0) {
            const nuevoItem: CartItem = {
                ...producto,
                instanceId: Date.now() + Math.random()
            };
            setCarrito(prev => [...prev, nuevoItem]);
        } else {
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
        if (confirm("¿Deseas vaciar tu carrito?")) {
            setCarrito([]);
        }
    };

    // --- NUEVA LÓGICA: INTERCEPTOR DE PAGO ---
    const handlePagarClick = () => {
        if (user) {
            // Si el usuario existe en Firebase, abrimos el modal de pago
            setIsCheckoutOpen(true);
        } else {
            // Si no está logueado, lo mandamos al login
            alert("Para proteger tu compra, inicia sesión o crea una cuenta en DONNI.");
            router.push('/login'); // Asegúrate de que la ruta coincida con el nombre de tu archivo (ej. /login)
        }
    };

    // --- LÓGICA DE SIMULACIÓN DE PAGO ---
    const procesarPago = (e: React.FormEvent) => {
        e.preventDefault();

        // Medida de seguridad extra: Si alguien logró burlar la UI y no hay usuario, bloqueamos la compra.
        if (!user) {
            alert("Error: Sesión no válida.");
            return;
        }

        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);

            const nuevaOrden = {
                id: 'ORD-' + Math.floor(Math.random() * 1000000),
                fecha: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
                total: total,
                items: carrito,
                estado: 'En preparación',
                comprador: user.email
            };

            // NUEVO: Creamos una llave única (Namespace) usando el UID de Firebase del usuario
            const storageKey = `donni-orders-${user.uid}`;

            // Leemos y guardamos usando esa llave única
            const ordenesPrevias = JSON.parse(localStorage.getItem(storageKey) || '[]');
            localStorage.setItem(storageKey, JSON.stringify([nuevaOrden, ...ordenesPrevias]));

            setCarrito([]);
        }, 2500);
    };
    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-slate-800">

            <div className="container mx-auto px-4 py-12 grow max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* BLOQUE 1: LISTA DE PRODUCTOS */}
                    <div className="grow">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-[#1a401f]">Tu Carrito</h2>
                            {carrito.length > 0 && (
                                <button onClick={vaciarCarrito} className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors">
                                    Vaciar todo
                                </button>
                            )}
                        </div>

                        {itemsAgrupados.length > 0 ? (
                            <div className="space-y-4">
                                {itemsAgrupados.map((item) => (
                                    <div key={item.id} className="bg-white rounded-[2rem] p-4 md:p-6 border border-slate-100 shadow-sm flex items-center gap-6">
                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shrink-0">
                                            <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase text-[#D48960] tracking-widest">{item.categoria}</span>
                                                    <h3 className="font-bold text-xl text-[#1a401f] leading-tight mt-0.5">{item.nombre}</h3>
                                                </div>
                                                <button onClick={() => eliminarProductoCompleto(item.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2">
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-6">
                                                <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                                                    <button onClick={() => modificarCantidad(item, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl text-[#1a401f] shadow-sm"><Minus size={14} /></button>
                                                    <span className="w-10 text-center font-black text-sm">{item.cantidad}</span>
                                                    <button onClick={() => modificarCantidad(item, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl text-[#1a401f] shadow-sm"><Plus size={14} /></button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-2xl text-[#1a401f] tracking-tighter">
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
                                <ShoppingCart size={48} className="mx-auto text-slate-200 mb-4" />
                                <h3 className="text-2xl font-bold text-[#1a401f] mb-2">Tu carrito está vacío</h3>
                                <p className="text-slate-400 mb-8">Agrega algunas plantas y comienza tu aventura botánica.</p>
                                <a href="/marketplace" className="inline-block bg-[#1a401f] text-white px-10 py-4 rounded-full font-bold hover:bg-[#115e3b] transition-colors">Explorar Catálogo</a>
                            </div>
                        )}
                    </div>

                    {/* BLOQUE 2: PANEL DE RESUMEN */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 sticky top-28">
                            <h3 className="text-xl font-black mb-8 flex items-center text-[#1a401f]">
                                <ShieldCheck className="mr-2 text-[#D48960]" size={24} /> Resumen de Compra
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between font-semibold text-sm">
                                    <span className="text-slate-500">Subtotal</span>
                                    <span className="text-[#1a401f]">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-sm">
                                    <span className="text-slate-500 flex items-center cursor-help" title="Gratis en compras mayores a $1500">
                                        Envío seguro <Info size={14} className="ml-1 text-slate-300" />
                                    </span>
                                    <span className={envio === 0 && subtotal > 0 ? "text-[#115e3b] font-bold" : "text-[#1a401f]"}>
                                        {envio === 0 ? (subtotal > 0 ? '¡Gratis!' : '$0.00') : `$${envio.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between font-semibold text-sm">
                                    <span className="text-slate-500 flex items-center cursor-help" title="Reemplazo gratuito si la planta llega dañada">
                                        Garantía Botánica <Info size={14} className="ml-1 text-slate-300" />
                                    </span>
                                    <span className="text-[#1a401f]">${garantia.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-xs text-slate-400 pt-2 border-t border-slate-100">
                                    <span>Impuestos (IVA 16%)</span>
                                    <span>Incluido</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1 tracking-widest">Total a pagar</span>
                                <span className="text-5xl font-black tracking-tighter text-[#1a401f] tabular-nums">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            {/* EL INTERCEPTOR: Llamamos a la nueva función handlePagarClick en lugar de abrir el modal directo */}
                            <button
                                onClick={handlePagarClick}
                                disabled={carrito.length === 0}
                                className="w-full bg-[#D48960] text-white py-5 rounded-full font-black text-lg shadow-lg shadow-[#D48960]/30 hover:bg-[#c27a51] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                <CreditCard size={22} /> Pagar Ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* BLOQUE 3: MODAL DE CHECKOUT (La Pasarela de Pago) */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl">

                        {/* Estado 1: Éxito */}
                        {paymentSuccess ? (
                            <div className="p-12 text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                    <CheckCircle size={40} />
                                </div>
                                <h2 className="text-3xl font-black text-[#1a401f] mb-4">¡Pago Exitoso!</h2>
                                <p className="text-slate-500 mb-8">Tu pedido está siendo procesado. Te enviaremos tu guía de cuidado botánico a <strong>{user?.email}</strong>.</p>
                                <button
                                    onClick={() => { setIsCheckoutOpen(false); window.location.href = "/mis-pedidos"; }}
                                    className="bg-[#1a401f] text-white px-8 py-3 rounded-full font-bold hover:bg-[#115e3b] transition-colors"
                                >
                                    Ver estatus de mi pedido
                                </button>
                            </div>
                        ) : (
                            /* Estado 2: Formulario de Pago */
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-black text-[#1a401f]">Finalizar Compra</h2>
                                    <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                                        <Trash2 size={24} className="rotate-45" />
                                    </button>
                                </div>

                                <form onSubmit={procesarPago} className="space-y-4">
                                    <div className="space-y-3">
                                        <p className="text-sm font-bold text-slate-700">Datos de Envío</p>
                                        {/* Autocompletamos el email con el usuario de Firebase si existe */}
                                        <input required type="text" placeholder="Nombre completo" defaultValue={user?.displayName || ''} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1a401f] focus:ring-1 focus:ring-[#1a401f] outline-none transition-all" />
                                        <input required type="email" placeholder="Correo electrónico" defaultValue={user?.email || ''} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1a401f] focus:ring-1 focus:ring-[#1a401f] outline-none transition-all" />
                                        <input required type="text" placeholder="Dirección completa" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1a401f] focus:ring-1 focus:ring-[#1a401f] outline-none transition-all" />
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-slate-100">
                                        <p className="text-sm font-bold text-slate-700 flex items-center justify-between">
                                            Tarjeta de Crédito <ShieldCheck size={16} className="text-emerald-500" />
                                        </p>
                                        <input required type="text" placeholder="Número de tarjeta (Ej. 4111 1111 ...)" maxLength={16} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1a401f] outline-none font-mono text-sm" />
                                        <div className="flex gap-4">
                                            <input required type="text" placeholder="MM/AA" maxLength={5} className="w-1/2 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1a401f] outline-none font-mono text-sm" />
                                            <input required type="text" placeholder="CVC" maxLength={4} className="w-1/2 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1a401f] outline-none font-mono text-sm" />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full mt-6 bg-[#1a401f] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#115e3b] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {isProcessing ? (
                                            <><Loader2 className="animate-spin" size={20} /> Procesando pago...</>
                                        ) : (
                                            `Pagar $${total.toFixed(2)}`
                                        )}
                                    </button>
                                    <p className="text-center text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-widest">
                                        Pagos seguros encriptados a 256-bit
                                    </p>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}