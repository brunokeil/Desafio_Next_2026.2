"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingBag, Truck, ArrowLeft, Check, Plus, Minus, Star } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge: string | null;
}

export default function ProductClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const [cep, setCep] = useState("");
  const [shippingData, setShippingData] = useState<{ address: string; price: number; days: number } | null>(null);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);
  const [shippingError, setShippingError] = useState("");

  const handleCalculateShipping = async () => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) {
      setShippingError("CEP inválido");
      setShippingData(null);
      return;
    }

    setIsLoadingShipping(true);
    setShippingError("");
    setShippingData(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setShippingError("CEP não encontrado");
      } else {

        const isRJ = data.uf === "RJ";
        const price = isRJ ? 15.90 : 29.90;
        const days = isRJ ? 2 : 7;
        
        setShippingData({
          address: `${data.logradouro || data.localidade}, ${data.localidade} - ${data.uf}`,
          price,
          days,
        });
      }
    } catch (error) {
      setShippingError("Erro ao calcular o frete");
    } finally {
      setIsLoadingShipping(false);
    }
  };

  const SIZES = ["P", "M", "G", "GG", "XG"];

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <main className="flex-1 bg-black text-white pt-32 pb-24 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="mb-8">
          <Link href="/produtos" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Voltar para o catálogo</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="relative aspect-[4/5] bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-hidden flex items-center justify-center p-8 group">
              
              {product.badge && (
                <div className="absolute top-6 left-6 z-10 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                  {product.badge}
                </div>
              )}
              
              <button className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 transition-all shadow-xl">
                <Heart className="w-5 h-5" />
              </button>

              <div className="relative w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain filter drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className={`relative w-20 h-24 rounded-xl border-2 ${idx === 1 ? 'border-red-600 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'} overflow-hidden cursor-pointer transition-all`}>
                  <Image src={product.image} alt="Thumbnail" fill className="object-contain p-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-10">
            
            <div className="mb-6">
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-zinc-400 text-sm">(128 avaliações)</span>
              </div>
              
              <div className="text-3xl font-bold text-white mb-6">
                {product.price}
                <span className="text-sm font-normal text-zinc-500 ml-3">em até 10x sem juros</span>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                {product.description} Este produto é desenvolvido com tecnologia de ponta para proporcionar o máximo conforto e desempenho, seja nas arquibancadas ou no dia a dia.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Tamanho</h3>
                <button className="text-sm text-zinc-400 hover:text-red-500 transition-colors underline decoration-zinc-700 hover:decoration-red-500 underline-offset-4">
                  Guia de Medidas
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] scale-110"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quantidade</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden ${
                  isAdded 
                    ? "bg-green-600 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)]" 
                    : "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transform hover:-translate-y-1"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    Adicionado
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Adicionar ao Carrinho
                  </>
                )}
              </button>
              <button className="flex-1 py-4 px-8 rounded-2xl font-bold text-lg bg-white hover:bg-zinc-200 text-black transition-all duration-300 transform hover:-translate-y-1">
                Comprar Agora
              </button>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300">
              <div className="bg-zinc-800 p-3 rounded-xl text-zinc-300 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">Frete e Entrega</h4>
                <p className="text-sm text-zinc-400 mb-3">
                  Insira seu CEP para consultar os prazos e valores de entrega.
                </p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="00000-000" 
                    value={cep}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length > 5) {
                        val = val.replace(/^(\d{5})(\d)/, "$1-$2");
                      }
                      setCep(val.slice(0, 9));
                    }}
                    className="bg-black border border-zinc-800 text-white px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-red-600 w-32 transition-colors"
                  />
                  <button 
                    onClick={handleCalculateShipping}
                    disabled={isLoadingShipping || cep.length < 9}
                    className="text-sm font-semibold text-zinc-300 hover:text-white px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingShipping ? "Calculando..." : "Calcular"}
                  </button>
                </div>
                
                {shippingError && (
                  <p className="text-red-500 text-xs mt-3 animate-fade-in">{shippingError}</p>
                )}
                
                {shippingData && (
                  <div className="mt-4 p-4 bg-zinc-800/40 border border-zinc-700/50 rounded-xl animate-fade-in">
                    <p className="text-xs text-zinc-400 mb-3 font-medium">{shippingData.address}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-white font-medium">Padrão (até {shippingData.days} dias úteis)</span>
                      </div>
                      <span className="text-sm font-bold text-red-500">
                        {shippingData.price === 0 ? "Grátis" : `R$ ${shippingData.price.toFixed(2).replace(".", ",")}`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
