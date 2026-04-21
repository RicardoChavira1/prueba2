'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X, Minus, Sparkles, Sprout } from 'lucide-react';
// Importamos el modelo configurado desde tu archivo de librería
import { model } from "@/app/lib/firebase";

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: '¡Hola! Soy DONNI AI, tu experto botánico. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      /** * PASO 4 DE LA DOCUMENTACIÓN:
       * Usamos el SDK de Firebase AI Logic directamente 
       */
      const result = await model.generateContent(userText);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'ai', text: text }]);
    } catch (error) {
      console.error("Error en DONNI AI:", error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Lo siento, mis raíces están algo enredadas. ¿Podrías intentar de nuevo?' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Botón Flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#1a401f] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3 border-4 border-white group"
        >
          <div className="bg-[#D48960] p-1 rounded-lg">
             <MessageSquare size={20} className="text-white" />
          </div>
          <span className="font-black text-[10px] uppercase tracking-widest pr-2 hidden md:block text-white">Consultar Experto</span>
        </button>
      )}

      {/* Ventana de Chat */}
      {isOpen && (
        <div className={`bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden transition-all duration-300 flex flex-col ${isMinimized ? 'h-20 w-80' : 'h-[500px] w-[350px] md:w-[380px]'}`}>
          
          {/* Header */}
          <div className="bg-[#1a401f] p-5 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <Sprout size={20} className="text-[#D48960]" />
              </div>
              <div>
                <h3 className="font-bold text-base leading-none text-white">DONNI AI</h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/50 block mt-1">Sistema Experto</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white outline-none">
                <Minus size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white outline-none">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Cuerpo */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fafaf9]">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm ${
                      m.role === 'ai' 
                      ? 'bg-white text-slate-700 rounded-tl-none shadow-sm border border-slate-100' 
                      : 'bg-[#1a401f] text-white rounded-tr-none font-bold'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/80 p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                      <div className="w-1.5 h-1.5 bg-[#D48960] rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-[#D48960] rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-[#D48960] rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-5 bg-white border-t border-slate-50">
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 focus-within:border-[#1a401f] transition-all">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="¿Cómo cuido mi cuna de moisés?"
                    className="flex-1 bg-transparent px-3 py-1.5 text-sm outline-none text-slate-700 placeholder:text-slate-300"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-[#1a401f] text-white p-2.5 rounded-xl disabled:opacity-30 hover:bg-[#265c2c] transition-all shadow-md"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
                <div className="flex justify-center items-center gap-1.5 mt-3">
                  <Sparkles size={10} className="text-[#D48960]" />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-300">Powered by Gemini 3</span>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}