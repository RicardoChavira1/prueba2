'use client';

import { auth, googleProvider } from "@/app/lib/firebase";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Estados para el formulario
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const brandGreen = "#115e3b";

  // Función para Login con Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/"); 
    } catch (err: any) {
      setError("Error al conectar con Google. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Función unificada para Login o Registro por Correo
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        // Lógica de Registro
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Opcional: Actualizar el nombre del usuario si se registró manualmente
        if (displayName) {
          await updateProfile(userCredential.user, { displayName });
        }
      } else {
        // Lógica de Inicio de Sesión
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: any) {
      console.error(err.code);
      // Manejo de errores amigable para el usuario
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError("Este correo ya está registrado.");
          break;
        case 'auth/weak-password':
          setError("La contraseña debe tener al menos 6 caracteres.");
          break;
        case 'auth/invalid-credential':
          setError("Correo o contraseña incorrectos.");
          break;
        case 'auth/invalid-email':
          setError("El formato del correo no es válido.");
          break;
        default:
          setError("Ocurrió un error. Verifica tus datos.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="p-8 bg-white shadow-xl rounded-[2.5rem] w-full max-w-md border border-gray-100 transition-all duration-500">
        <h1 className="text-4xl font-black text-center text-[#115e3b] mb-2 tracking-tighter">DONNI</h1>
        <p className="text-gray-500 text-center mb-8 font-medium">
          {isRegistering ? "Crea tu cuenta botánica" : "Inicia sesión para cuidar tus plantas"}
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-xs text-center font-bold border border-red-100 animate-pulse">
            {error}
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleAuth} className="space-y-4 mb-6">
          {isRegistering && (
            <div className="transition-all">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-2">Nombre Completo</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Juan Pérez"
                className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#115e3b]/20 focus:border-[#115e3b] outline-none transition-all text-sm font-medium"
                required={isRegistering}
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-2">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hola@donni.com"
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#115e3b]/20 focus:border-[#115e3b] outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#115e3b]/20 focus:border-[#115e3b] outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#115e3b] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#0d4a2f] transition-all shadow-lg shadow-green-900/10 disabled:opacity-50 active:scale-95"
          >
            {loading ? "Procesando..." : isRegistering ? "Crear Cuenta" : "Entrar"}
          </button>
        </form>

        {/* DIVISOR */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
            <span className="px-4 bg-white text-gray-300">O usa tu cuenta de</span>
          </div>
        </div>

        {/* BOTÓN DE GOOGLE */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 font-bold text-gray-600 shadow-sm disabled:opacity-50 active:scale-95"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-5 h-5"
          />
          Google
        </button>

        {/* TOGGLE REGISTRO/LOGIN */}
        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(null);
            }}
            className="text-xs font-bold text-slate-400 hover:text-[#115e3b] transition-colors"
          >
            {isRegistering 
              ? "¿Ya tienes cuenta? Inicia sesión aquí" 
              : "¿Eres nuevo? Regístrate gratis ahora"}
          </button>
        </div>

        <div className="mt-8 text-center text-[10px] text-gray-300 leading-relaxed uppercase tracking-widest font-bold">
          Diseñado por el equipo de DONNI <br />
          © {new Date().getFullYear()} SEER
        </div>
      </div>
    </div>
  );
}