"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsCheckCircle, BsLightningCharge, BsShieldLock, BsArrowCounterclockwise } from "react-icons/bs";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

const products = [
  {
    id: 1,
    name: "Camisa Oficial I 2025",
    price: 349.9,
    image: "/product-1.jpg",
    tag: "Mais Vendido",
  },
  {
    id: 2,
    name: "Camisa Oficial II 2025",
    price: 329.9,
    image: "/product-2.jpg",
    tag: "Novo",
  },
  {
    id: 3,
    name: "Agasalho Treino",
    price: 449.9,
    image: "/product-3.jpg",
    tag: null,
  },
  {
    id: 4,
    name: "Shorts Oficial",
    price: 179.9,
    image: "/product-4.jpg",
    tag: null,
  },
];

const stats = [
  { value: 45, suffix: "M+", label: "Torcedores" },
  { value: 8, suffix: "x", label: "Campeão Brasileiro" },
  { value: 3, suffix: "x", label: "Libertadores" },
  { value: 1895, suffix: "", label: "Fundação" },
];

const mvv = [
  {
    title: "Missão",
    content:
      "Proporcionar aos torcedores a melhor experiência de compra, conectando paixão e qualidade em cada produto oficial.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Visão",
    content:
      "Ser a maior e mais reconhecida loja esportiva do Brasil, referência em inovação, atendimento e compromisso com a nação rubro-negra.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Valores",
    content:
      "Paixão, autenticidade, excelência, compromisso com o torcedor e respeito à tradição do maior clube do Brasil.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  const heroSection = useInView(0.1);
  const productsSection = useInView(0.1);
  const aboutSection = useInView(0.1);
  const mvvSection = useInView(0.1);
  const ctaSection = useInView(0.1);

  return (
    <>
      <section
        id="hero"
        ref={heroSection.ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--fla-darker)]/80 via-[var(--fla-darker)]/50 to-[var(--fla-darker)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--fla-darker)]/60 to-transparent" />
        </div>

        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--fla-red)] opacity-[0.03] blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--fla-gold)] opacity-[0.03] blur-[100px] animate-float delay-300" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--neutral-500) 1px, transparent 1px), linear-gradient(90deg, var(--neutral-500) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-default)] bg-[rgba(17,17,17,0.5)] backdrop-blur-md mb-8 ${
              heroSection.inView
                ? "animate-fade-in-up opacity-100"
                : "opacity-0"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--fla-red)] animate-pulse" />
            <span className="text-xs font-medium text-[var(--neutral-400)] tracking-wide uppercase">
              Nova Coleção 2026 Disponível
            </span>
          </div>

          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6 ${
              heroSection.inView
                ? "animate-fade-in-up delay-200 opacity-100"
                : "opacity-0"
            }`}
          >
            <span className="text-white block">Vista a</span>
            <span className="gradient-text block mt-2">Paixão.</span>
          </h1>

          <p
            className={`max-w-xl mx-auto text-lg md:text-xl text-[var(--neutral-400)] leading-relaxed mb-10 ${
              heroSection.inView
                ? "animate-fade-in-up delay-300 opacity-100"
                : "opacity-0"
            }`}
          >
            A loja oficial do maior clube do Brasil. Camisas, agasalhos e
            acessórios com a qualidade que o{" "}
            <span className="text-white font-medium">torcedor</span> merece.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center ${
              heroSection.inView
                ? "animate-fade-in-up delay-400 opacity-100"
                : "opacity-0"
            }`}
          >
            <Link href="/produtos" className="btn-primary">
              <span className="flex items-center gap-2">
                Ver Produtos
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
            <a href="#sobre" className="btn-secondary">
              Conheça a História
            </a>
          </div>

          <div
            className={`mt-20 flex flex-col items-center gap-2 ${
              heroSection.inView
                ? "animate-fade-in delay-700 opacity-100"
                : "opacity-0"
            }`}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--neutral-600)]">
              Role para explorar
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-[var(--neutral-700)] flex justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-[var(--fla-red)] animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 border-y border-[var(--border-subtle)] bg-[var(--fla-darker)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center group">
                <p className="text-3xl md:text-4xl font-black gradient-text mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2000 + i * 300}
                  />
                </p>
                <p className="text-sm text-[var(--neutral-500)] font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="produtos"
        ref={productsSection.ref}
        className="relative py-24 md:py-32"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--fla-red)] opacity-[0.02] blur-[150px]" />

        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`text-center mb-16 ${
              productsSection.inView
                ? "animate-fade-in-up opacity-100"
                : "opacity-0"
            }`}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--fla-red)] border border-[var(--fla-red)]/20 rounded-full mb-4">
              Destaques
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Produtos em{" "}
              <span className="gradient-text">Destaque</span>
            </h2>
            <p className="max-w-lg mx-auto text-[var(--neutral-500)]">
              Confira os produtos mais desejados pela torcida. Qualidade e estilo para todos os momentos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div
                key={product.id}
                className={`glass-card group cursor-pointer ${
                  productsSection.inView
                    ? `animate-fade-in-up delay-${(i + 1) * 100} opacity-100`
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: productsSection.inView
                    ? `${(i + 1) * 100}ms`
                    : "0ms",
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {product.tag && (
                    <div className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--fla-red)] text-white rounded-full">
                      {product.tag}
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <button className="w-full py-3 text-sm font-semibold text-white bg-[var(--fla-red)]/90 backdrop-blur-md rounded-xl hover:bg-[var(--fla-red)] transition-colors">
                      Ver Mais
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[var(--fla-red-light)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xl font-black gradient-text">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="text-xs text-[var(--neutral-600)] mt-1">
                    ou 10x de R${" "}
                    {(product.price / 10).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/produtos" className="btn-secondary">
              Ver Todos os Produtos
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="sobre"
        ref={aboutSection.ref}
        className="relative py-24 md:py-32 bg-[var(--fla-darker)]"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--fla-red)]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`text-center mb-20 ${
              aboutSection.inView
                ? "animate-fade-in-up opacity-100"
                : "opacity-0"
            }`}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--fla-gold)] border border-[var(--fla-gold)]/20 rounded-full mb-4">
              Sobre Nós
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Mais que uma loja.{" "}
              <span className="gradient-text-gold">Uma nação.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-[var(--neutral-400)] text-lg leading-relaxed">
              Fundada pela paixão rubro-negra, nossa loja une tradição e
              modernidade para oferecer o melhor do universo Flamengo. Cada
              produto carrega a história e a glória do maior clube do Brasil.
            </p>
          </div>

          <div
            ref={mvvSection.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {mvv.map((item, i) => (
              <div
                key={item.title}
                className={`glass-card p-8 text-center ${
                  mvvSection.inView
                    ? `animate-fade-in-up opacity-100`
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: mvvSection.inView
                    ? `${(i + 1) * 150}ms`
                    : "0ms",
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--fla-red)]/10 to-[var(--fla-red)]/5 border border-[var(--fla-red)]/10 text-[var(--fla-red)] mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--neutral-400)] leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--fla-red)] opacity-[0.015] blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--fla-red)] border border-[var(--fla-red)]/20 rounded-full mb-6">
                Por que nós?
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight">
                A experiência que o{" "}
                <span className="gradient-text">torcedor</span> merece.
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Produtos Oficiais",
                    desc: "Todos os itens são licenciados e com certificação de autenticidade.",
                    icon: <BsCheckCircle size={20} />,
                  },
                  {
                    title: "Entrega Rápida",
                    desc: "Enviamos para todo o Brasil com rastreamento em tempo real.",
                    icon: <BsLightningCharge size={20} />,
                  },
                  {
                    title: "Pagamento Seguro",
                    desc: "PIX, cartão e boleto com criptografia de ponta a ponta.",
                    icon: <BsShieldLock size={20} />,
                  },
                  {
                    title: "Troca Garantida",
                    desc: "30 dias para trocar ou devolver, sem complicação.",
                    icon: <BsArrowCounterclockwise size={20} />,
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="flex gap-4 group cursor-default"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--fla-red)]/10 border border-[var(--fla-red)]/10 flex items-center justify-center text-base group-hover:bg-[var(--fla-red)]/20 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-[var(--neutral-500)] leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--fla-red)]/10 to-[var(--fla-gold)]/5 blur-3xl scale-110" />

                <Link href="/produtos/1" className="glass-card overflow-hidden animate-float relative block cursor-pointer group hover:border-[var(--fla-red)] transition-colors">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src="/product-1.jpg"
                      alt="Camisa Oficial"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-xs text-[var(--fla-gold)] font-semibold uppercase tracking-wider mb-1">
                        Destaque da Temporada
                      </p>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--fla-red-light)] transition-colors">
                        Camisa Oficial I 2025
                      </h3>
                      <p className="text-2xl font-black gradient-text">
                        R$ 349,90
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contato"
        ref={ctaSection.ref}
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--fla-darker)] via-[var(--background)] to-[var(--fla-darker)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--fla-red)]/5 to-[var(--fla-gold)]/5" />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--fla-red)]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--fla-red)]/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div
            className={`${
              ctaSection.inView
                ? "animate-fade-in-up opacity-100"
                : "opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Pronto para vestir{" "}
              <span className="gradient-text">o manto?</span>
            </h2>
            <p className="text-lg text-[var(--neutral-400)] mb-10 max-w-xl mx-auto">
              Junte-se à maior nação de torcedores do mundo. Explore nossa
              coleção completa e encontre o produto perfeito para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/produtos" className="btn-primary">
                <span className="flex items-center gap-2">
                  Explorar Loja
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
              <Link href="/contato" className="btn-secondary">
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
