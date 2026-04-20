'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, Clock, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
// IMPORTANTE: Traemos nuestra burbuja de autenticación
import { useAuth } from '../context/AuthContext';

// --- INTERFACES ---
interface OrderItem {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
}

interface Order {
    id: string;
    fecha: string;
    total: number;
    items: OrderItem[];
    estado: string;
}

export default function MisPedidosPage() {
    // Consumimos el contexto global y el enrutador
    const { user, loading } = useAuth();
    const router = useRouter();

    const [orders, setOrders] = useState<Order[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // --- CARGA DE DATOS Y PROTECCIÓN DE RUTA ---
    useEffect(() => {
        // Si aún está cargando Firebase o Next.js no ha montado el componente, esperamos.
        if (!isMounted || loading) return;

        if (user) {
            // 1. Si hay usuario, buscamos SUS pedidos específicos usando su UID
            const storageKey = `donni-orders-${user.uid}`;
            const savedOrders = localStorage.getItem(storageKey);

            if (savedOrders) {
                try {
                    setOrders(JSON.parse(savedOrders));
                } catch (e) {
                    console.error("Error al cargar los pedidos");
                }
            }
        } else {
            // 2. Si terminó de cargar y NO hay usuario, es un intruso. Lo mandamos al login.
            router.push('/login');
        }
    }, [user, loading, isMounted, router]);

    // Pantalla de carga mientras Firebase confirma quién es el usuario
    if (!isMounted || loading) {
        return (
            <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-[#1a401f] mb-4" size={40} />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Verificando credenciales...</p>
            </div>
        );
    }

    // Evita destellos en la pantalla si el usuario no existe (justo antes de ser redirigido)
    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-slate-800">
            <div className="container mx-auto px-4 py-12 max-w-5xl grow">

                <div className="mb-10">
                    <h2 className="text-3xl font-black text-[#1a401f] mb-2">Mis Pedidos</h2>
                    <p className="text-slate-500">
                        Historial botánico de <strong className="text-[#D48960]">{user.displayName || user.email}</strong>.
                    </p>
                </div>

                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <div key={index} className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                {/* CABECERA DE LA ORDEN */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-sm font-bold text-[#1a401f]">{order.id}</span>
                                            <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                                                <Clock size={14} /> {order.estado}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-medium">Realizado el {order.fecha}</p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Total</p>
                                        <p className="text-2xl font-black text-[#1a401f] tracking-tighter">${order.total.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* LISTA DE ARTÍCULOS */}
                                <div className="space-y-4">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                                                <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="grow">
                                                <h4 className="font-bold text-[#1a401f] text-sm">{item.nombre}</h4>
                                                <p className="text-xs text-slate-500">${Number(item.precio).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-end">
                                    <button className="text-[#D48960] text-sm font-bold flex items-center hover:text-[#c27a51] transition-colors">
                                        Ver guía de cuidados <ArrowRight size={16} className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (

                    <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
                        <ShoppingBag size={48} className="mx-auto text-slate-200 mb-4" />
                        <h3 className="text-2xl font-bold text-[#1a401f] mb-2">Aún no tienes pedidos</h3>
                        <p className="text-slate-400 mb-8">Tu historial botánico está esperando su primera planta.</p>
                        <Link href="/marketplace" className="inline-flex items-center justify-center bg-[#1a401f] text-white px-8 py-3 rounded-full font-bold hover:bg-[#115e3b] transition-colors">
                            Explorar Catálogo
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}