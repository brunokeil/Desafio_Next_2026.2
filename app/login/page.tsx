"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft, BsEye, BsEnvelope, BsPerson, BsArrowRight, BsCheckCircleFill } from "react-icons/bs";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen w-full text-white font-sans overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Background"
          fill
          className="object-cover opacity-60 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[var(--fla-red)]/30" />
      </div>

      <div className="relative z-10 w-full h-screen flex">
        
        <div className={`absolute top-0 left-0 w-full lg:w-1/2 h-full flex flex-col p-8 md:p-16 xl:p-24 transition-all duration-700 ease-in-out ${
          isLogin ? "opacity-100 z-10 delay-300" : "opacity-0 z-0 pointer-events-none"
        }`}>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors w-max mb-12">
            <BsArrowLeft /> Voltar para a página inicial
          </Link>

          <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-lg bg-[var(--fla-red)] flex items-center justify-center shadow-[0_0_15px_rgba(212,23,30,0.5)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 5 8.5 5 15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15C19 10 14 7 14 7C14 7 16 9.5 16 12C16 12 18 15 18 15C18 15 16 19 12 19C8 19 7 15 7 15C7 15 9 12 9 12C9 12 12 16 12 16C12 16 14 13 14 10C14 7 12 2 12 2Z"/>
                </svg>
              </div>
              <span className="font-semibold tracking-wide">
                Nação <span className="text-[var(--fla-red)]">Rubro-Negra</span>
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Bem-vindo de volta.</h1>
            <p className="text-neutral-400 mb-10 text-sm leading-relaxed">
              Entre na sua conta para acompanhar pedidos e aproveitar ofertas exclusivas da nação.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300">E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <BsEnvelope />
                  </div>
                  <input 
                    type="email" 
                    placeholder="voce@email.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--fla-red)] focus:bg-white/10 backdrop-blur-md transition-all placeholder-neutral-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-300">Senha</label>
                  <a href="#" className="text-xs text-[var(--fla-red)] hover:underline">Esqueceu a senha?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-10 text-sm focus:outline-none focus:border-[var(--fla-red)] focus:bg-white/10 backdrop-blur-md transition-all placeholder-neutral-500"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-300">
                    <BsEye />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative flex items-center">
                  <input type="checkbox" id="remember" className="peer w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-[var(--fla-red)] checked:border-[var(--fla-red)] appearance-none cursor-pointer transition-colors" />
                  <BsCheckCircleFill className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5" />
                </div>
                <label htmlFor="remember" className="text-sm text-neutral-300 cursor-pointer select-none">Lembrar de mim neste dispositivo</label>
              </div>

              <button className="w-full bg-[var(--fla-red)] hover:bg-[#b01117] shadow-[0_0_20px_rgba(212,23,30,0.4)] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 mt-4 flex items-center justify-center gap-2 group">
                Entrar
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-center text-sm text-neutral-400 mt-8 lg:hidden">
              Ainda não faz parte da nação?{" "}
              <button onClick={() => setIsLogin(false)} className="text-[var(--fla-red)] hover:underline font-medium">
                Crie sua conta
              </button>
            </p>
          </div>
        </div>

        <div className={`absolute top-0 right-0 w-full lg:w-1/2 h-full flex flex-col p-8 md:p-16 xl:p-24 transition-all duration-700 ease-in-out ${
          !isLogin ? "opacity-100 z-10 delay-300" : "opacity-0 z-0 pointer-events-none"
        }`}>
          <div className="flex justify-between items-center mb-8">
            <div className="lg:hidden flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--fla-red)] flex items-center justify-center shadow-[0_0_15px_rgba(212,23,30,0.5)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 5 8.5 5 15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15C19 10 14 7 14 7C14 7 16 9.5 16 12C16 12 18 15 18 15C18 15 16 19 12 19C8 19 7 15 7 15C7 15 9 12 9 12C9 12 12 16 12 16C12 16 14 13 14 10C14 7 12 2 12 2Z"/>
                </svg>
              </div>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors w-max ml-auto">
              <BsArrowLeft /> Voltar para a página inicial
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
            <div className="hidden lg:flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[var(--fla-red)] flex items-center justify-center shadow-[0_0_15px_rgba(212,23,30,0.5)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 5 8.5 5 15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15C19 10 14 7 14 7C14 7 16 9.5 16 12C16 12 18 15 18 15C18 15 16 19 12 19C8 19 7 15 7 15C7 15 9 12 9 12C9 12 12 16 12 16C12 16 14 13 14 10C14 7 12 2 12 2Z"/>
                </svg>
              </div>
              <span className="font-semibold tracking-wide">
                Nação <span className="text-[var(--fla-red)]">Rubro-Negra</span>
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-3 tracking-tight">Faça parte da nação.</h1>
            <p className="text-neutral-400 mb-8 text-sm leading-relaxed">
              Crie sua conta em menos de um minuto e aproveite benefícios exclusivos para torcedores.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300">Nome completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <BsPerson />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Seu nome" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--fla-red)] focus:bg-white/10 backdrop-blur-md transition-all placeholder-neutral-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300">E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <BsEnvelope />
                  </div>
                  <input 
                    type="email" 
                    placeholder="voce@email.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--fla-red)] focus:bg-white/10 backdrop-blur-md transition-all placeholder-neutral-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300">Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </div>
                  <input 
                    type="password" 
                    placeholder="Mínimo 8 caracteres" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-10 text-sm focus:outline-none focus:border-[var(--fla-red)] focus:bg-white/10 backdrop-blur-md transition-all placeholder-neutral-500"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-300">
                    <BsEye />
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="relative flex items-center mt-0.5">
                    <input type="checkbox" id="terms" className="peer w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-[var(--fla-red)] checked:border-[var(--fla-red)] appearance-none cursor-pointer transition-colors" />
                    <BsCheckCircleFill className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5" />
                  </div>
                  <label htmlFor="terms" className="text-sm text-neutral-300 cursor-pointer select-none leading-tight">
                    Eu concordo com os <a href="#" className="text-[var(--fla-red)] hover:underline">Termos de Uso</a> e a <a href="#" className="text-[var(--fla-red)] hover:underline">Política de Privacidade</a>.
                  </label>
                </div>
              </div>

              <button className="w-full bg-[var(--fla-red)] hover:bg-[#b01117] shadow-[0_0_20px_rgba(212,23,30,0.4)] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 mt-4 flex items-center justify-center gap-2 group">
                Criar conta
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-center text-sm text-neutral-400 mt-6 lg:hidden">
              Já tem conta?{" "}
              <button onClick={() => setIsLogin(true)} className="text-[var(--fla-red)] hover:underline font-medium">
                Entre aqui
              </button>
            </p>
          </div>
        </div>

        <div
          className={`hidden lg:block absolute top-0 w-1/2 h-full z-20 transition-transform duration-1000 ease-in-out ${
            isLogin ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-2xl border-x border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--fla-red)]/20 to-black/60 mix-blend-overlay" />
          </div>

          <div className="relative z-10 w-full h-full flex items-center justify-center p-16 xl:p-24 text-center">
            
            <div className={`absolute w-full px-16 transition-all duration-700 ease-in-out ${
              isLogin ? "opacity-100 delay-300" : "opacity-0 pointer-events-none"
            }`}>
              <h2 className="text-5xl font-black mb-6 leading-tight">
                Novo por aqui?<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">Junte-se à Nação.</span>
              </h2>
              <p className="text-lg text-neutral-300 mb-10 leading-relaxed">
                Crie sua conta em menos de um minuto e aproveite benefícios exclusivos como frete grátis, lançamentos antecipados e descontos especiais.
              </p>
              <button 
                onClick={() => setIsLogin(false)}
                className="px-10 py-3.5 rounded-full border border-white/40 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all font-bold tracking-wide text-sm uppercase"
              >
                Criar minha conta
              </button>
            </div>

            <div className={`absolute w-full px-16 transition-all duration-700 ease-in-out ${
              !isLogin ? "opacity-100 delay-300" : "opacity-0 pointer-events-none"
            }`}>
              <h2 className="text-5xl font-black mb-6 leading-tight">
                Já é da Nação?<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">Acesse sua conta.</span>
              </h2>
              <p className="text-lg text-neutral-300 mb-10 leading-relaxed">
                Entre com seu e-mail e senha para acompanhar seus pedidos, salvar favoritos e receber ofertas em primeira mão.
              </p>
              <button 
                onClick={() => setIsLogin(true)}
                className="px-10 py-3.5 rounded-full border border-white/40 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all font-bold tracking-wide text-sm uppercase"
              >
                Entrar agora
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
