"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BsCheckCircleFill, BsArrowRight } from "react-icons/bs";

export default function SucessoPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto w-full">
        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8 border-2 border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
          <BsCheckCircleFill size={48} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4">Pagamento Aprovado!</h1>
        <p className="text-xl text-neutral-400 mb-10 leading-relaxed">
          Sua compra foi confirmada com sucesso. A Nação agradece pela confiança!
          O seu pedido já está sendo preparado e em breve será enviado.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/pedidos" 
            className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-semibold transition-colors flex justify-center"
          >
            Acompanhar Pedido
          </Link>
          <Link 
            href="/produtos" 
            className="px-8 py-4 bg-[var(--fla-red)] hover:bg-[#b01117] text-white rounded-xl font-bold shadow-[0_0_20px_rgba(212,23,30,0.4)] transition-colors flex items-center justify-center gap-2 group"
          >
            Continuar Comprando
            <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
