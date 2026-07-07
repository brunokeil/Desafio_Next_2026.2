"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    category: "CAMISAS",
    name: "Camisa Oficial I 2025",
    description: "A camisa I da temporada 2025 traz o tradicional manto rubro-negro em tecido leve",
    price: "R$ 349,90",
    image: "/product-1.jpg",
    badge: null,
  },
  {
    id: 2,
    category: "CAMISAS",
    name: "Camisa Oficial II 2025",
    description: "A camisa II 2025 é o uniforme alternativo da temporada, em base clara com detalhes em",
    price: "R$ 349,90",
    image: "/product-2.jpg",
    badge: null,
  },
  {
    id: 3,
    category: "CAMISAS",
    name: "Camisa Goleiro 2025",
    description: "Modelo oficial usado pelos goleiros da equipe principal. Mangas longas com reforço nos",
    price: "R$ 379,90",
    image: "/product-3.jpg",
    badge: null,
  },
  {
    id: 4,
    category: "CAMISAS",
    name: "Camisa Retrô 1981",
    description: "Réplica oficial da camisa campeã mundial de 1981, com gola V e listras clássicas. Para",
    price: "R$ 299,90",
    image: "/product-4.jpg",
    badge: "Edição",
  },
  {
    id: 5,
    category: "AGASALHOS",
    name: "Agasalho Treino Rubro-Negro",
    description: "Conjunto de treino oficial, com tecido térmico, bolsos com zíper e detalhes",
    price: "R$ 499,90",
    image: "/product-1.jpg",
    badge: "Top",
  },
  {
    id: 6,
    category: "AGASALHOS",
    name: "Jaqueta Hino",
    description: "Edição limitada da jaqueta hino, com bordado especial e numeração serializada. Apenas",
    price: "R$ 629,90",
    image: "/product-2.jpg",
    badge: "Limitado",
  },
  {
    id: 7,
    category: "AGASALHOS",
    name: "Moletom Nação",
    description: "Moletom canguru em algodão pesado, com estampa exclusiva da nação. Conforto",
    price: "R$ 389,90",
    image: "/product-3.jpg",
    badge: null,
  },
  {
    id: 8,
    category: "SHORTS",
    name: "Short Oficial Jogo",
    description: "Short usado pelos jogadores em campo, leve e com tecnologia dry-fit. Disponível em todos",
    price: "R$ 199,90",
    image: "/product-4.jpg",
    badge: "Promo",
  },
  {
    id: 9,
    category: "CAMISAS",
    name: "Camisa Oficial I 2025",
    description: "A camisa I da temporada 2025 traz o tradicional manto rubro-negro em tecido leve",
    price: "R$ 349,90",
    image: "/product-1.jpg",
    badge: null,
  },
  {
    id: 10,
    category: "CAMISAS",
    name: "Camisa Oficial II 2025",
    description: "A camisa II 2025 é o uniforme alternativo da temporada, em base clara com detalhes em",
    price: "R$ 349,90",
    image: "/product-2.jpg",
    badge: null,
  },
  {
    id: 11,
    category: "CAMISAS",
    name: "Camisa Goleiro 2025",
    description: "Modelo oficial usado pelos goleiros da equipe principal. Mangas longas com reforço nos",
    price: "R$ 379,90",
    image: "/product-3.jpg",
    badge: null,
  },
  {
    id: 12,
    category: "CAMISAS",
    name: "Camisa Retrô 1981",
    description: "Réplica oficial da camisa campeã mundial de 1981, com gola V e listras clássicas. Para",
    price: "R$ 299,90",
    image: "/product-4.jpg",
    badge: "Edição",
  },
];

const CATEGORIES = ["Tudo", "Camisas", "Agasalhos", "Shorts", "Acessórios", "Infantil"];

export default function Produtos() {
  const [activeCategory, setActiveCategory] = useState("Tudo");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "Tudo" || product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex-1 bg-black text-white pt-32 pb-24">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-red-600 text-xs font-bold tracking-widest uppercase mb-4">
            Catálogo Completo
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Toda a coleção <span className="text-red-600">Rubro-Negra</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Explore camisas, agasalhos, shorts, acessórios e linha infantil — tudo oficial, tudo com a paixão da nação.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white pl-11 pr-4 py-3 rounded-full text-sm focus:outline-none focus:border-red-600 transition-colors placeholder:text-zinc-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-zinc-400 text-sm mb-8 border-b border-zinc-900 pb-4">
          <span>{filteredProducts.length} produtos</span>
          <span>Página 1 de 2</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col hover:border-red-900 transition-all duration-300"
            >
              <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden p-6 flex items-center justify-center">
                
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {product.badge}
                  </div>
                )}
                
                <button className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 transition-all">
                  <Heart className="w-4 h-4" />
                </button>

                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain filter drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <span className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">
                  {product.category}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-zinc-400 text-sm mb-6 line-clamp-2 flex-1">
                  {product.description}
                </p>
                
                <div className="mt-auto">
                  <div className="text-red-500 font-bold text-xl mb-4">
                    {product.price}
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                    Ver Mais
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600 text-white font-medium shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              1
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
              2
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
