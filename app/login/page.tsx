'use client';

import { auth, googleProvider } from "@/app/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Usuario:", result.user);
      // Si el login es exitoso, redirigimos al inicio o al perfil
      router.push("/"); 
    } catch (err: any) {
      console.error(err);
      setError("Hubo un error al iniciar sesión con Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">DONNI</h1>
        <p className="text-gray-500 text-center mb-8">Bienvenido de nuevo, inicia sesión para continuar.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700 shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <span>Cargando...</span>
          ) : (
            <>
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                className="w-5 h-5"
              />
              Continuar con Google
            </>
          )}
        </button>

        <div className="mt-6 text-center text-xs text-gray-400">
          Al iniciar sesión, aceptas nuestros términos y condiciones.
        </div>
      </div>
    </div>
  );
}