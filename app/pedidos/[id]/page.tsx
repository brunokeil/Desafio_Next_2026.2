"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BsArrowLeft, BsBoxSeam, BsDownload } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { getOrderById } from "@/app/actions/orderActions";

export default function DetalhesPedidoPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [pedido, setPedido] = useState<any>(null);
  
  useEffect(() => {
    setMounted(true);
    if (params.id) {
      getOrderById(params.id as string).then(setPedido);
    }
  }, [params.id]);

  const handleDownloadReceipt = () => {
    if (!pedido) return;
    
    const doc = new jsPDF();
    
    // Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(212, 23, 30); // var(--fla-red)
    doc.text("Loja da Nação", 14, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("Recibo do Pedido", 14, 30);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Pedido ID: ${pedido.id}`, 14, 40);
    doc.text(`Data: ${new Date(pedido.createdAt).toLocaleDateString('pt-BR')} ${new Date(pedido.createdAt).toLocaleTimeString('pt-BR')}`, 14, 46);
    
    // Tabela de itens
    const tableBody = pedido.items.map((item: any) => [
      item.product.name,
      item.size || "-",
      item.quantity.toString(),
      item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      (item.quantity * item.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    ]);
    
    autoTable(doc, {
      startY: 55,
      head: [['Produto', 'Tamanho', 'Qtd', 'Preço Unitário', 'Total']],
      body: tableBody,
      theme: 'striped',
      headStyles: { fillColor: [212, 23, 30] }, 
    });
    
    // Resumo
    const finalY = (doc as any).lastAutoTable.finalY || 55;
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Subtotal: ${pedido.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`, 130, finalY + 15);
    doc.text(`Frete: R$ 0,00`, 130, finalY + 22);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: ${pedido.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`, 130, finalY + 32);
    
    // Rodapé
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Obrigado por comprar na loja da Nação!", 14, finalY + 50);
    
    // Salvar o arquivo
    doc.save(`Recibo_Pedido_${pedido.id}.pdf`);
  };

  if (!mounted) return null;
  
  if (!pedido) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Pedido não encontrado</h1>
        <Link href="/pedidos" className="text-[var(--fla-red)] hover:underline">Voltar para meus pedidos</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6">
        <div className="mb-8 mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link href="/pedidos" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-4">
              <BsArrowLeft /> Voltar para pedidos
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Detalhes do Pedido</h1>
            <p className="text-neutral-400 mt-1">Pedido <span className="text-white font-medium">{pedido.id}</span> • Feito em {new Date(pedido.createdAt).toLocaleDateString('pt-BR')}</p>
          </div>
          
          <button 
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border border-white/20 hover:bg-white hover:text-black transition-colors"
          >
            <BsDownload /> Recibo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Itens do pedido</h2>
              <div className="space-y-4">
                {pedido.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 py-3 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/5">
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                        <BsBoxSeam size={24} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-200">{item.product.name}</p>
                      <p className="text-sm text-neutral-500 mt-0.5">Tamanho: {item.size} | Qtd: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Resumo</h2>
              <div className="space-y-3 text-sm text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{pedido.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className="text-white">R$ 0,00</span>
                </div>
                <div className="h-px bg-white/10 my-1"></div>
                <div className="flex justify-between text-base font-bold text-white">
                  <span>Total</span>
                  <span className="text-[var(--fla-red)]">{pedido.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Informações</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1">Endereço de Entrega</p>
                  <p className="text-sm text-neutral-300 whitespace-pre-line">Endereço de entrega vinculado à conta</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1">Pagamento</p>
                  <p className="text-sm text-neutral-300">PagSeguro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
