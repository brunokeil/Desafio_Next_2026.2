"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/produtos" },
  { label: "Sobre Nós", href: "/#sobre" },
  { label: "Contato", href: "/contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-3"
          : "bg-transparent py-5"
      }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo.jpg"
              alt="Nação Rubro-Negra"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">Nação</span>{" "}
            <span className="gradient-text">Rubro-Negra</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-[var(--neutral-400)] hover:text-white transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[var(--fla-red)] transition-all duration-300 group-hover:w-3/4 rounded-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative hidden md:block">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-2 pr-4 py-1.5 text-sm font-medium rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <div className="w-7 h-7 rounded-full bg-[var(--fla-red)] flex items-center justify-center overflow-hidden text-xs font-bold text-white group-hover:shadow-md transition-all">
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
                {user.name.split(' ')[0]}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] py-3 flex flex-col z-50 transform origin-top-right transition-all">
                  <div className="px-5 py-3 border-b border-white/10 mb-2 bg-gradient-to-r from-transparent via-white/5 to-transparent">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-neutral-400 truncate mt-0.5">{user.email}</p>
                  </div>
                  <Link href="/perfil" className="px-5 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Meu Perfil
                  </Link>
                  <Link href="/pedidos" className="px-5 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    Meus Pedidos
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="px-5 py-2.5 text-sm text-left text-[var(--fla-red)] hover:bg-[var(--fla-red)]/10 transition-colors mt-1 border-t border-white/10 pt-3 font-medium flex items-center gap-3"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Sair da conta
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[var(--fla-red)] transition-colors">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Entrar
            </Link>
          )}

          <Link
            href="/carrinho"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[var(--fla-red)] text-white hover:bg-[var(--fla-red-light)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(212,23,30,0.4)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Carrinho {cartItemCount > 0 && `(${cartItemCount})`}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden glass transition-all duration-500 overflow-hidden ${
          mobileOpen ? "max-h-80 mt-2" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-[var(--neutral-300)] hover:text-white hover:bg-[rgba(212,23,30,0.1)] rounded-lg transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/carrinho"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-4 py-3 text-sm font-semibold text-center rounded-lg bg-[var(--fla-red)] text-white"
          >
            Carrinho {cartItemCount > 0 && `(${cartItemCount})`}
          </Link>
        </div>
      </div>
    </nav>
  );
}
