"use client";

import { useState } from 'react';
import { Plus, Trash2, Edit2, X, Eye, Search } from 'lucide-react';
import { createProduct, updateProduct, deleteProduct } from '@/app/actions/productActions';

export default function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalType, setModalType] = useState<'edit' | 'delete' | 'view' | null>(null);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData);
    } else {
      await createProduct(formData);
    }
    
    window.location.reload();
  }

  async function handleDelete() {
    if (editingProduct) {
      await deleteProduct(editingProduct.id);
      window.location.reload();
    }
  }

  const openModal = (type: 'edit' | 'delete' | 'view', product?: any) => {
    setModalType(type);
    setEditingProduct(product || null);
    setPreviewImage(product?.imageUrl || '');
  };

  const closeModal = () => {
    setModalType(null);
    setEditingProduct(null);
    setPreviewImage('');
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-[#E50000] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Admin</p>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Gerenciamento de Produtos</h1>
        <p className="text-neutral-400">Crie, edite e remova produtos da loja.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Buscar produto..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-white focus:outline-none focus:border-[#E50000] transition-colors"
          />
        </div>
        <button 
          onClick={() => openModal('edit')}
          className="w-full sm:w-auto bg-[#E50000] hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Produto
        </button>
      </div>

      <div className="bg-transparent border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-neutral-300">
          <thead className="bg-transparent border-b border-white/10 text-neutral-500 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Produto</th>
              <th className="px-6 py-4 hidden sm:table-cell">Categoria</th>
              <th className="px-6 py-4">Preço</th>
              <th className="px-6 py-4 hidden md:table-cell">Descrição</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {product.imageUrl ? (
                      <div className="w-12 h-12 rounded-lg bg-[#111111] shrink-0 border border-white/10 flex items-center justify-center p-1.5 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-[#111111] shrink-0 border border-white/10" />
                    )}
                    <span className="font-medium text-white">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">{product.category || '-'}</td>
                <td className="px-6 py-4 text-[#E50000] font-medium whitespace-nowrap">R$ {product.price.toFixed(2).replace('.', ',')}</td>
                <td className="px-6 py-4 hidden md:table-cell text-neutral-400 max-w-xs truncate">{product.description || '-'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => openModal('view', product)}
                    className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openModal('edit', product)}
                    className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openModal('delete', product)}
                    className="p-2 hover:bg-red-500/20 rounded-lg text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalType === 'edit' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 pb-2">
              <h2 className="text-xl font-bold text-white w-full text-center">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-neutral-400 hover:text-white transition-colors absolute right-6"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Nome</label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={editingProduct?.name}
                  required 
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Nome do Produto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Categoria</label>
                  <input 
                    type="text" 
                    name="category" 
                    defaultValue={editingProduct?.category}
                    required 
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Categoria"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Preço (R$)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    name="price" 
                    defaultValue={editingProduct?.price}
                    required 
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="99.90"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">URL da imagem</label>
                <input 
                  type="url" 
                  name="imageUrl" 
                  defaultValue={editingProduct?.imageUrl}
                  onChange={(e) => setPreviewImage(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Descrição</label>
                <textarea 
                  name="description" 
                  defaultValue={editingProduct?.description}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
                  placeholder="Descrição..."
                  rows={3}
                />
              </div>

              {previewImage && (
                <div className="mt-2 rounded-xl overflow-hidden border border-white/10 bg-black/50 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewImage} alt="Preview" className="w-full aspect-[4/3] object-contain" />
                </div>
              )}

              <div className="pt-4 flex justify-between gap-3 flex-col sm:flex-row mt-2">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-white border border-white/10 hover:bg-white/5 transition-all order-2 sm:order-1"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#E50000] hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all order-1 sm:order-2 flex-1"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === 'view' && editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 pb-2">
              <h2 className="text-xl font-bold text-white w-full text-center">
                Visualizar Produto
              </h2>
              <button 
                onClick={closeModal}
                className="text-neutral-400 hover:text-white transition-colors absolute right-6"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Nome</label>
                <div className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-white">
                  {editingProduct.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Categoria</label>
                  <div className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-white">
                    {editingProduct.category || '-'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Preço (R$)</label>
                  <div className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-white">
                    {editingProduct.price}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">URL da imagem</label>
                <div className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-neutral-400 truncate text-sm">
                  {editingProduct.imageUrl || '-'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Descrição</label>
                <div className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-white min-h-[5rem]">
                  {editingProduct.description || '-'}
                </div>
              </div>

              {editingProduct.imageUrl && (
                <div className="mt-2 rounded-xl overflow-hidden border border-white/10 bg-black/50 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editingProduct.imageUrl} alt={editingProduct.name} className="w-full aspect-[4/3] object-contain" />
                </div>
              )}

              <div className="pt-4 flex justify-center mt-2">
                <button 
                  onClick={closeModal}
                  className="w-full border border-white/10 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-white/5 transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalType === 'delete' && editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-[400px] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 pb-2">
              <h2 className="text-xl font-bold text-white w-full text-center">
                Excluir produto
              </h2>
              <button 
                onClick={closeModal}
                className="text-neutral-400 hover:text-white transition-colors absolute right-6"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 pt-2">
              <p className="text-neutral-400 mb-6 text-center text-[15px]">
                Tem certeza que deseja excluir <span className="text-white">{editingProduct.name}</span>? Esta ação não pode ser desfeita.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={closeModal}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-white border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2 order-2 sm:order-1"
                >
                  <X className="w-4 h-4" /> Cancelar
                </button>
                <button 
                  onClick={handleDelete}
                  className="w-full sm:w-auto bg-[#E50000] hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 order-1 sm:order-2 flex-1"
                >
                  <Trash2 className="w-4 h-4" /> Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
