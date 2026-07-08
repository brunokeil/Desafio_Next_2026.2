"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Trash2, Plus, Minus, Tag, ArrowRight } from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function Carrinho() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const frete = cartItems.length > 0 ? 29.90 : 0;
  const total = subtotal + frete;

  return (
    <main className="flex-1 bg-black text-white pt-32 pb-24 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="mb-12">
          <span className="text-red-600 text-xs font-bold tracking-widest uppercase mb-4 block">
            Seu Carrinho
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Vista a paixão
          </h1>
          <p className="text-zinc-400 text-lg">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no carrinho.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="flex-1 flex flex-col gap-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
                <p className="text-zinc-400 mb-4">Seu carrinho está vazio.</p>
                <Link 
                  href="/produtos" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-zinc-800 rounded-full text-sm font-medium text-white hover:bg-zinc-900 transition-colors"
                >
                  Ir para loja
                </Link>
              </div>
            ) : cartItems.map(item => (
              <div 
                key={`${item.id}-${item.size}`}
                className="flex items-center gap-6 p-4 md:p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl relative"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-zinc-900 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain filter drop-shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between h-full py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1 block">
                        {item.category}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-zinc-400 text-sm">
                        Tamanho: {item.size}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-zinc-500 hover:text-red-500 transition-colors p-2"
                      title="Remover"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 bg-black border border-zinc-800 rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-4 text-center font-medium text-sm">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-red-500 font-bold text-lg">
                      R$ {(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {cartItems.length > 0 && (
              <div className="mt-4">
                <Link 
                  href="/produtos" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-zinc-800 rounded-full text-sm font-medium text-white hover:bg-zinc-900 transition-colors"
                >
                  Continuar comprando
                </Link>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[400px]">
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6">Resumo do pedido</h2>
              
              <div className="flex gap-2 mb-8">
                <div className="relative flex-1">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Cupom de desconto" 
                    className="w-full bg-black border border-zinc-800 text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <button className="px-5 py-3 border border-zinc-800 rounded-xl text-sm font-medium text-white hover:bg-zinc-800 transition-colors">
                  Aplicar
                </button>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between text-zinc-400 text-sm">
                  <span>Subtotal</span>
                  <span className="text-white">R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-sm">
                  <span>Frete</span>
                  <span className="text-white">R$ {frete.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-6 mb-8 flex justify-between items-end">
                <span className="text-white font-semibold">Total</span>
                <span className="text-3xl font-black text-red-500">
                  R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                Comprar
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-zinc-600 text-[11px] mt-4 max-w-[250px] mx-auto">
                Pagamento processado com criptografia de ponta a ponta.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
