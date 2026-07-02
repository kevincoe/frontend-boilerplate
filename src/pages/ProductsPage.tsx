import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, LayoutGrid, PackageOpen, X, AlertTriangle } from 'lucide-react';
import { useEquipment } from '../hooks/useProducts';
import { ProductList } from '../components/ProductList';
import { useCartStore } from '../store/useCartStore';
import { PRODUCT_CATEGORIES } from '../types';
import { updateProduct, updateProductStock, deleteProduct } from '../services/productsService';
import type { Product } from '../types/index';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const navigate = useNavigate();
  
  const { products, isLoading, error, refetch } = useEquipment();
  const addItem = useCartStore((state) => state.addItem);

  // Modal States
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [stockProduct, setStockProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // Form States
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});
  const [newStock, setNewStock] = useState<number>(0);

  useEffect(() => {
    refetch({ search: searchTerm, category: selectedCategory });
  }, [selectedCategory, refetch, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch({ search: searchTerm, category: selectedCategory });
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    navigate('/quote');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      await updateProduct(editingProduct.id, editFormData);
      setEditingProduct(null);
      refetch({ search: searchTerm, category: selectedCategory });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao atualizar produto');
    }
  };

  const handleStockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockProduct) return;
    try {
      await updateProductStock(stockProduct.id, newStock);
      setStockProduct(null);
      refetch({ search: searchTerm, category: selectedCategory });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao ajustar estoque');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return;
    try {
      await deleteProduct(deletingProduct.id);
      setDeletingProduct(null);
      refetch({ search: searchTerm, category: selectedCategory });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao excluir produto');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 relative">
        
        {/* Header Section CRM Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
              <PackageOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Catálogo e Inventário</h1>
              <p className="text-sm text-gray-500 mt-1">Gerencie seu acervo de equipamentos para locação</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/equipment/new')}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar Novo</span>
          </button>
        </div>

        {/* Toolbar: Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nome ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
              >
                Buscar
              </button>
            </form>
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory('')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === ''
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Todas as Categorias
            </button>
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid Header */}
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <LayoutGrid className="w-5 h-5 mr-2 text-gray-400" />
            Itens no Acervo
          </h2>
          <span className="text-sm text-gray-500">{products.length} itens listados nesta página</span>
        </div>

        {/* Products List */}
        <ProductList 
          products={products} 
          loading={isLoading} 
          error={error ? error.message || String(error) : undefined} 
          onAddToCart={handleAddToCart}
          onEdit={(product) => { setEditingProduct(product); setEditFormData(product); }}
          onAdjustStock={(product) => { setStockProduct(product); setNewStock(product.totalStock); }}
          onDelete={(product) => setDeletingProduct(product)}
        />
        
        {/* Modal: Edit Product */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">Editar Produto</h3>
                <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input type="text" required value={editFormData.name || ''} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select required value={editFormData.category || ''} onChange={e => setEditFormData({...editFormData, category: e.target.value as any})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white">
                      {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preço/Dia</label>
                    <input type="number" step="0.01" required value={editFormData.pricePerDay || 0} onChange={e => setEditFormData({...editFormData, pricePerDay: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea value={editFormData.description || ''} onChange={e => setEditFormData({...editFormData, description: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">Salvar Alterações</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Adjust Stock */}
        {stockProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">Ajustar Estoque</h3>
                <button onClick={() => setStockProduct(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleStockSubmit} className="p-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Atualize a quantidade total de <strong>{stockProduct.name}</strong>. Atualmente existem {stockProduct.totalStock} peças.
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Novo Estoque Físico Total</label>
                  <input type="number" min="0" required value={newStock} onChange={e => setNewStock(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setStockProduct(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">Confirmar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Delete Confirmation */}
        {deletingProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Excluir Produto?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Tem certeza que deseja excluir <strong>{deletingProduct.name}</strong>? Esta ação removerá o produto e todos os seus registros de estoque permanentemente.
              </p>
              <div className="flex justify-center gap-3">
                <button type="button" onClick={() => setDeletingProduct(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex-1">Cancelar</button>
                <button type="button" onClick={handleDeleteConfirm} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 flex-1">Sim, Excluir</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};