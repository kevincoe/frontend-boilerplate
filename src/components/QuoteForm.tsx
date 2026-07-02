import React, { useState } from 'react';
import type { CreateQuoteRequest } from '../types/index';

interface QuoteFormProps {
  onSubmit: (data: CreateQuoteRequest) => void;
  loading?: boolean;
  error?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    assetIds: [] as string[],
    pickUpDate: '',
    returnDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Solicitar Cotação</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-1">
            ID do Cliente
          </label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="pickUpDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Retirada
          </label>
          <input
            type="date"
            id="pickUpDate"
            name="pickUpDate"
            value={formData.pickUpDate}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Devolução
          </label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Solicitar Cotação'}
          </button>
        </div>
      </form>
    </div>
  );
};