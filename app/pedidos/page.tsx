"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BsBoxSeam, BsClockHistory, BsCheckCircleFill, BsTruck } from "react-icons/bs";
import { useCart } from "@/context/CartContext";

import { getUserOrders } from "@/app/actions/orderActions";

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'delivered':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20"><BsCheckCircleFill /> Entregue</span>;
    case 'in_transit':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"><BsTruck /> Em Trânsito</span>;
    case 'payment_pending':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"><BsClockHistory /> Aguardando Pagamento</span>;
    default:
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-500/10 text-neutral-400 border border-neutral-500/20">Desconhecido</span>;
  }
};

export default function PedidosPage() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getUserOrders().then(setOrders);
    }
  }, [user]);

  const handleComprarNovamente = (items: any[]) => {
    items.forEach(item => addToCart({
      id: item.productId,
      category: item.product.category || "Tudo",
      name: item.product.name,
      size: item.size || "M",
      price: item.price,
      quantity: item.quantity,
      image: item.product.imageUrl || "/product-1.jpg"
    }));
    router.push("/carrinho");
  };

  const handlePagarAgora = async (pedidoId: string) => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      window.location.href = `/sucesso?orderId=${pedidoId}`;
    }, 1000);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [user, mounted, router]);

  if (!mounted || !user) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-6">
        <div className="mb-10 mt-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Meus Pedidos</h1>
          <p className="text-neutral-400">Acompanhe o status das suas compras na loja da Nação.</p>
        </div>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-neutral-400 mb-4">Você ainda não tem nenhum pedido.</p>
              <Link href="/produtos" className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white hover:text-black transition-colors font-medium">
                Ver produtos
              </Link>
            </div>
          ) : orders.map((pedido) => (
            <div key={pedido.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
              <div className="px-6 py-4 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <div>
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">Pedido</p>
                    <p className="font-semibold text-sm md:text-base">{pedido.id}</p>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-white/10"></div>
                  <div>
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">Data</p>
                    <p className="font-medium text-sm md:text-base">{new Date(pedido.createdAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-white/10"></div>
                  <div>
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">Total</p>
                    <p className="font-bold text-[var(--fla-red)] text-sm md:text-base">
                      {pedido.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </p>
                  </div>
                </div>
                
                <div>
                  <StatusBadge status={pedido.status} />
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {pedido.items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/5">
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                          <BsBoxSeam size={24} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm md:text-base text-neutral-200 truncate">{item.product.name}</p>
                        <p className="text-sm text-neutral-500 mt-0.5">Tamanho: {item.size} | Qtd: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm md:text-base">
                          {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap justify-end gap-3">
                  <Link href={`/pedidos/${pedido.id}`} className="px-5 py-2.5 text-sm font-medium rounded-xl border border-white/20 hover:bg-white hover:text-black transition-colors">
                    Ver detalhes
                  </Link>
                  {pedido.status === 'delivered' && (
                    <button 
                      onClick={() => handleComprarNovamente(pedido.items)}
                      className="px-5 py-2.5 text-sm font-medium rounded-xl bg-[var(--fla-red)] text-white hover:bg-[#b01117] transition-colors shadow-[0_0_15px_rgba(212,23,30,0.3)]"
                    >
                      Comprar novamente
                    </button>
                  )}
                  {pedido.status === 'payment_pending' && (
                    <button 
                      disabled={isProcessing}
                      onClick={() => handlePagarAgora(pedido.id)}
                      className="px-5 py-2.5 text-sm font-medium rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors shadow-[0_0_15px_rgba(22,163,74,0.3)] disabled:opacity-50"
                    >
                      {isProcessing ? "Processando..." : "Pagar agora"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
