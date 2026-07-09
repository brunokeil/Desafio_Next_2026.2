"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Contato() {
  const [formData, setFormData] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Erro ao enviar a mensagem");
      }
      
      setStatus("success");
      setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Ocorreu um erro ao enviar. Tente novamente mais tarde.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[var(--background)] pt-24 pb-12">
        {/* Header section */}
        <section className="pt-16 pb-12 px-6 relative overflow-hidden flex flex-col items-center text-center animate-fade-in-up">
            <h4 className="text-xs font-bold text-[var(--fla-red)] uppercase tracking-[0.2em] mb-4">
              Fale com a nação
            </h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Estamos aqui para <span className="text-[var(--fla-red)]">te ouvir</span>
            </h1>
            <p className="text-[var(--neutral-400)] max-w-xl mx-auto text-lg">
              Dúvidas sobre produtos, pedidos ou parcerias? Entre em contato — respondemos em até 24h úteis.
            </p>
        </section>

        {/* Content section */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Form */}
            <div className="animate-slide-right delay-200">
              <h2 className="text-2xl font-bold mb-6">Envie sua mensagem</h2>
              <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[var(--neutral-300)]">Nome</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Seu nome" className="w-full bg-[var(--fla-darker)] border border-[var(--border-strong)] rounded-lg p-3 text-white placeholder-[var(--neutral-600)] focus:outline-none focus:border-[var(--fla-red)] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[var(--neutral-300)]">E-mail</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="voce@email.com" className="w-full bg-[var(--fla-darker)] border border-[var(--border-strong)] rounded-lg p-3 text-white placeholder-[var(--neutral-600)] focus:outline-none focus:border-[var(--fla-red)] transition-colors" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--neutral-300)]">Assunto</label>
                  <input type="text" name="assunto" value={formData.assunto} onChange={handleChange} required placeholder="Sobre o que você quer falar?" className="w-full bg-[var(--fla-darker)] border border-[var(--border-strong)] rounded-lg p-3 text-white placeholder-[var(--neutral-600)] focus:outline-none focus:border-[var(--fla-red)] transition-colors" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--neutral-300)]">Mensagem</label>
                  <textarea rows={4} name="mensagem" value={formData.mensagem} onChange={handleChange} required placeholder="Escreva sua mensagem aqui..." className="w-full bg-[var(--fla-darker)] border border-[var(--border-strong)] rounded-lg p-3 text-white placeholder-[var(--neutral-600)] focus:outline-none focus:border-[var(--fla-red)] transition-colors resize-none"></textarea>
                </div>
                
                <div className="mt-2 flex flex-col gap-3">
                  <button type="submit" disabled={status === 'loading'} className="btn-primary w-fit disabled:opacity-70 disabled:cursor-not-allowed">
                    <span>{status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}</span>
                    {status !== 'loading' && <Send className="w-4 h-4 ml-2" />}
                  </button>
                  {status === 'success' && (
                    <div className="flex items-center gap-2 text-green-500 text-sm animate-fade-in">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mensagem enviada com sucesso!</span>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-[var(--fla-red)] text-sm animate-fade-in">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
            
            {/* Outros Canais */}
            <div className="animate-slide-left delay-300">
              <h2 className="text-2xl font-bold mb-6">Outros canais</h2>
              
              {/* Contact info cards */}
              <div className="glass-card p-6 md:p-8 flex flex-col gap-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--fla-red)]/10 flex items-center justify-center shrink-0 border border-[var(--fla-red)]/20">
                    <Phone className="w-5 h-5 text-[var(--fla-red)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-1">Telefone</h4>
                    <p className="text-white font-medium">(21) 3333-4444</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--fla-red)]/10 flex items-center justify-center shrink-0 border border-[var(--fla-red)]/20">
                    <Mail className="w-5 h-5 text-[var(--fla-red)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-1">E-mail</h4>
                    <p className="text-white font-medium">contato@nacaorn.com.br</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--fla-red)]/10 flex items-center justify-center shrink-0 border border-[var(--fla-red)]/20">
                    <MapPin className="w-5 h-5 text-[var(--fla-red)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-1">Endereço</h4>
                    <p className="text-white font-medium">Av. Presidente Vargas, 417 — Rio de Janeiro, RJ</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--fla-red)]/10 flex items-center justify-center shrink-0 border border-[var(--fla-red)]/20">
                    <Clock className="w-5 h-5 text-[var(--fla-red)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-1">Atendimento</h4>
                    <p className="text-white font-medium">Seg a Sex, 9h às 18h</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="glass-card p-6 md:p-8 flex flex-col gap-4 mb-8">
                <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">Redes Sociais</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--neutral-400)] hover:text-[var(--fla-red)] hover:border-[var(--fla-red)] transition-all">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--neutral-400)] hover:text-[var(--fla-red)] hover:border-[var(--fla-red)] transition-all">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--neutral-400)] hover:text-[var(--fla-red)] hover:border-[var(--fla-red)] transition-all">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--neutral-400)] hover:text-[var(--fla-red)] hover:border-[var(--fla-red)] transition-all">
                    <FaYoutube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-64 w-full relative border border-[var(--border-subtle)]">
                <iframe
                  title="Localização da Loja"
                  src="https://maps.google.com/maps?q=Av.%20Presidente%20Vargas,%20417%20-%20Rio%20de%20Janeiro,%20RJ&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                ></iframe>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
