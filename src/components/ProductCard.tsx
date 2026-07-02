import React from 'react';
import type { Product } from '../types/index';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.png';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sem imagem
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <span className="text-lg font-bold text-emerald-600">R$ {product.pricePerDay.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-gray-600 mt-1">{product.category}</p>
        
        <p className="text-gray-700 mt-2 text-sm line-clamp-2">{product.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.isAvailable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.isAvailable ? 'Disponível' : 'Indisponível'}
          </span>
          
<button 
  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
  disabled={!product.isAvailable}
  onClick={() => onAddToCart && onAddToCart(product)}
>
  {product.isAvailable ? 'Alugar' : 'Indisponível'}
</button>
        </div>
      </div>
    </div>
  );
};