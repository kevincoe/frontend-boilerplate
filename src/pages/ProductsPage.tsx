import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/ProductList';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  
  const { products, isLoading, error, refetch } = useProducts();
  
  // Mock categories for demonstration
  const categories = ['Todos', 'Câmeras', 'Lentes', 'Acessórios', 'Tripés'];

  useEffect(() => {
    // Fetch products when component mounts
    refetch();
  }, [refetch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search API call
    console.log('Searching for:', searchTerm);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // In a real app, this would filter by category
    console.log('Filtering by category:', category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Catálogo de Produtos</h1>
            <p className="text-gray-600 mt-2">Explore nossa seleção de equipamentos para aluguel</p>
          </div>
          
          <button
            onClick={() => navigate('/quote')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Solicitar Cotação
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Buscar
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category || (selectedCategory === '' && category === 'Todos')
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <ProductList 
          products={products} 
          loading={isLoading} 
          error={error?.message || String(error)} 
        />
      </main>
    </div>
  );
};