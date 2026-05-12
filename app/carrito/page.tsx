'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from "@/app/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
// --- IMPORTAMOS LA FUNCIÓN DEL PDF ---
import { generateOrderPDF } from '../lib/generatePDF';

import {
    ShoppingCart, Search, Trash2, Plus, Minus, CreditCard,
    ShieldCheck, CheckCircle, Loader2, Info, FileText
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
    const router = useRouter();

    const [carrito, setCarrito] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState('');
    
    // CORRECCIÓN: Estado para capturar los datos antes de vaciar el carrito
    const [datosParaNota, setDatosParaNota] = useState<any>(null);

    useEffect(() => {
        setIsMounted(true);
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

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('donni-cart', JSON.stringify(carrito));
            window.dispatchEvent(new Event('storage'));
        }
    }, [carrito, isMounted]);

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

    const subtotal = useMemo(() => {
        return carrito.reduce((acc, item) => acc + (Number(item.precio) || 0), 0);
    }, [carrito]);

    const envio = subtotal >= 1500 || subtotal === 0 ? 0 : 150;
    const garantia = subtotal > 0 ? 49 : 0;
    const total = subtotal + envio + garantia;

    // --- CORRECCIÓN: FUNCIÓN PARA GENERAR EL PDF USANDO DATOS CAPTURADOS ---
    const handleDownloadNota = () => {
        if (!datosParaNota) {
            alert("No se encontraron datos de la compra para generar el PDF.");
            return;
        }

        generateOrderPDF({
            orderId: currentOrderId,
            customerName: user?.displayName || user?.email || "Cliente Donni",
            items: datosParaNota.items,
            subtotal: datosParaNota.subtotal,
            shipping: datosParaNota.shipping,
            total: datosParaNota.total,
            date: new Date().toLocaleDateString('es-MX')
        });
    };

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

    const handlePagarClick = () => {
        if (user) {
            setIsCheckoutOpen(true);
        } else {
            alert("Para proteger tu compra, inicia sesión o crea una cuenta en DONNI.");
            router.push('/login');
        }
    };

    const procesarPago = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsProcessing(true);

        setTimeout(() => {
            const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
            setCurrentOrderId(orderId); 
            
            // CORRECCIÓN: Capturamos los datos EXACTAMENTE antes de vaciar el carrito
            setDatosParaNota({
                items: itemsAgrupados.map(item => ({
                    name: item.nombre,
                    price: item.precio,
                    quantity: item.cantidad
                })),
                subtotal: subtotal,
                shipping: envio,
                total: total
            });

            setIsProcessing(false);
            setPaymentSuccess(true);

            const nuevaOrden = {
                id: orderId,
                fecha: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
                total: total,
                items: carrito,
                estado: 'En preparación',
                comprador: user.email
            };

            const storageKey = `donni-orders-${user.uid}`;
            const ordenesPrevias = JSON.parse(localStorage.getItem(storageKey) || '[]');
            localStorage.setItem(storageKey, JSON.stringify([nuevaOrden, ...ordenesPrevias]));

            // Finalmente, limpiamos el carrito
            setCarrito([]);
        }, 2500);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-slate-800">
            <div className="container mx-auto px-4 py-12 grow max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* LISTA DE PRODUCTOS */}
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

                    {/* PANEL DE RESUMEN */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 sticky top-28">
                            <h3 className="text-xl font-black mb-8 flex items-center text-[#1a401f]">
                                <ShieldCheck className="mr-2 text-[#D48960]" size={24} /> Resumen de Compra
                            </h3>
                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between font-semibold"><span className="text-slate-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between font-semibold">
                                    <span className="text-slate-500 flex items-center">Envío seguro <Info size={14} className="ml-1" /></span>
                                    <span>{envio === 0 ? '¡Gratis!' : `$${envio.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between font-semibold"><span className="text-slate-500">Garantía Botánica</span><span>${garantia.toFixed(2)}</span></div>
                            </div>
                            <div className="mb-8">
                                <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1 tracking-widest">Total a pagar</span>
                                <span className="text-5xl font-black tracking-tighter text-[#1a401f] tabular-nums">${total.toFixed(2)}</span>
                            </div>
                            <button onClick={handlePagarClick} disabled={carrito.length === 0} className="w-full bg-[#D48960] text-white py-5 rounded-full font-black text-lg shadow-lg hover:bg-[#c27a51] transition-all flex items-center justify-center gap-3">
                                <CreditCard size={22} /> Pagar Ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL DE CHECKOUT */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl">
                        {paymentSuccess ? (
                            <div className="p-12 text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                    <CheckCircle size={40} />
                                </div>
                                <h2 className="text-3xl font-black text-[#1a401f] mb-4">¡Pago Exitoso!</h2>
                                <p className="text-slate-500 mb-8">Tu pedido <strong>{currentOrderId}</strong> ha sido confirmado.</p>
                                
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleDownloadNota}
                                        className="w-full bg-[#D48960] text-white px-8 py-4 rounded-full font-bold hover:bg-[#b0714e] transition-colors flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <FileText size={20} /> Descargar Nota de Compra (PDF)
                                    </button>
                                    <button
                                        onClick={() => { setIsCheckoutOpen(false); router.push("/mis-pedidos"); }}
                                        className="w-full bg-[#1a401f] text-white px-8 py-4 rounded-full font-bold hover:bg-[#115e3b] transition-colors"
                                    >
                                        Ir a Mis Pedidos
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6 text-[#1a401f]">
                                    <h2 className="text-2xl font-black">Finalizar Compra</h2>
                                    <button onClick={() => setIsCheckoutOpen(false)}><Trash2 size={24} className="rotate-45" /></button>
                                </div>
                                <form onSubmit={procesarPago} className="space-y-4">
                                    <input required type="text" placeholder="Nombre completo" defaultValue={user?.displayName || ''} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1a401f]/20 transition-all" />
                                    <input required type="email" placeholder="Correo electrónico" defaultValue={user?.email || ''} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1a401f]/20 transition-all" />
                                    <input required type="text" placeholder="Dirección completa" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1a401f]/20 transition-all" />
                                    <div className="pt-4 border-t border-slate-100 space-y-3">
                                        <p className="text-sm font-bold text-slate-700">Datos de Tarjeta</p>
                                        <input required type="text" placeholder="Número de tarjeta" maxLength={16} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1a401f]/20 transition-all" />
                                        <div className="flex gap-4">
                                            <input required type="text" placeholder="MM/AA" className="w-1/2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1a401f]/20 transition-all" />
                                            <input required type="text" placeholder="CVC" className="w-1/2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1a401f]/20 transition-all" />
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isProcessing} className="w-full mt-6 bg-[#1a401f] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#115e3b] transition-all">
                                        {isProcessing ? <Loader2 className="animate-spin mx-auto" /> : `Pagar $${total.toFixed(2)}`}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}