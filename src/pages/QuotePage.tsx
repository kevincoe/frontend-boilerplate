import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuoteForm } from '../components/QuoteForm';
import { useCartStore } from '../store/useCartStore';
import { createQuote } from '../services/ordersService';
import axios from 'axios';

export const QuotePage: React.FC = () => {
  const { items, clearCart, removeItem, updateQuantity } = useCartStore();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmitQuote = async (data: import('../types/index').CreateQuoteRequest) => {
    if (items.length === 0) {
      setError('Adicione pelo menos um produto ao carrinho');
      return;
    }

    try {
      setLoading(true);
      setError(undefined);
      
      const payload = {
        ...data,
        items: items.map(item => ({ productId: item.product.id, quantity: item.quantity })),
        pickUpDate: new Date(data.pickUpDate).toISOString(),
        returnDate: new Date(data.returnDate).toISOString()
      };
      
      await createQuote(payload);
      clearCart();
      navigate('/orders');
    } catch (err) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.error : null;
      setError(msg || 'Erro ao criar cotação');
    } finally {
      setLoading(false);
    }
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
          {items.length === 0 ? (
            <p className="text-gray-500">Nenhum produto selecionado. Selecione produtos do catálogo.</p>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">R$ {item.product.pricePerDay}/dia un.</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 mr-6">
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">R$ {(item.product.pricePerDay * item.quantity).toFixed(2)} /dia total</span>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3">
                <p className="text-lg font-bold">Estimativa Total por dia: R$ {items.reduce((sum, i) => sum + (i.product.pricePerDay * i.quantity), 0).toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <QuoteForm 
          onSubmit={handleSubmitQuote}
          loading={loading}
        />
      </main>
    </div>
  );
};