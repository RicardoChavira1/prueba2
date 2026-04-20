'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase'; // Asegúrate de que esta ruta apunte a tu archivo de Firebase

// Definimos qué datos va a compartir nuestra burbuja
interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

// Creamos el contexto vacío
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { }
});

// Este es el componente que envolverá tu app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // El vigilante global
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        window.location.href = '/'; // Redirige al inicio al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Un "hook" personalizado para que cualquier componente lea al usuario fácilmente
export const useAuth = () => useContext(AuthContext);
