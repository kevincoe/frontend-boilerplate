import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuoteForm } from '../components/QuoteForm';
import type { Product } from '../types/index';

export const QuotePage: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  const handleSubmitQuote = (data: any) => {
    // In a real app, this would call the API
    console.log('Quote data:', data);
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Solicitar Cotação</h1>
            <p className="text-gray-600 mt-2">Selecione os produtos e preencha as informações</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Produtos Selecionados</h2>
          {selectedProducts.length === 0 ? (
            <p className="text-gray-500">Nenhum produto selecionado. Selecione produtos do catálogo.</p>
          ) : (
            <div className="space-y-3">
              {selectedProducts.map(product => (
                <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">R$ {product.pricePerDay}/dia</p>
                  </div>
                  <span className="font-semibold">R$ {product.pricePerDay}</span>
                </div>
              ))}
              <div className="border-t pt-3">
                <p className="text-lg font-bold">Total: R$ {selectedProducts.reduce((sum, p) => sum + p.pricePerDay, 0)}</p>
              </div>
            </div>
          )}
        </div>

        <QuoteForm 
          onSubmit={handleSubmitQuote}
        />
      </main>
    </div>
  );
};