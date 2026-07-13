"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BsPerson, BsEnvelope, BsCameraFill, BsLock } from "react-icons/bs";

export default function PerfilPage() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoto(user.photo || "");
    }
  }, [user, mounted, router]);

  if (!mounted || !user) return null;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulating API call
    setTimeout(() => {
      updateProfile({ name, email, photo });
      setMessage("Perfil atualizado com sucesso!");
      setIsSaving(false);
      
      setTimeout(() => setMessage(""), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-3xl mx-auto w-full px-6">
        <div className="mb-10 mt-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Meu Perfil</h1>
          <p className="text-neutral-400">Gerencie suas informações pessoais e preferências.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
          <form onSubmit={handleSave} className="space-y-8">
            
            {/* Photo Section */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                  {photo ? (
                    <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-white">{name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--fla-red)] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <BsCameraFill size={14} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-lg">Foto de Perfil</h3>
                <p className="text-sm text-neutral-400 mt-1">Formatos suportados: JPG, PNG. Tamanho máximo: 5MB.</p>
              </div>
            </div>

            <div className="h-px bg-white/10 w-full my-6"></div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300">Nome completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                    <BsPerson />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[var(--fla-red)] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300">E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                    <BsEnvelope />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[var(--fla-red)] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300">Nova Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                    <BsLock />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Deixe em branco para não alterar"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[var(--fla-red)] transition-all"
                  />
                </div>
              </div>
            </div>

            {message && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium">
                {message}
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={isSaving}
                className="px-8 py-3 bg-[var(--fla-red)] hover:bg-[#b01117] text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(212,23,30,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
