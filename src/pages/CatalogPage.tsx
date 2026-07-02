import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { useCartStore } from '../store/useCartStore';

export const CatalogPage: React.FC = () => {
  const { products, isLoading, error } = useProducts();
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) return <div className="p-8 text-center">Carregando catálogo...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">Erro ao carregar catálogo.</div>;

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Catálogo Pegue-e-Monte</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500">Nenhum produto encontrado.</p>
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addItem} />
          ))
        )}
      </div>
    </main>
  );
};

export default CatalogPage;