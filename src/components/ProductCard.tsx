import React from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Early return or guard clause pattern
  const handleAddToCart = () => {
    if (!product.isAvailable) return;
    onAddToCart(product);
  };

  return (
    <article 
      className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      aria-labelledby={`product-title-${product.id}`}
    >
      <img 
        src={product.imageUrl} 
        alt={`Imagem de ${product.name}`} 
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 
          id={`product-title-${product.id}`} 
          className="text-lg font-semibold text-gray-800 mb-2"
        >
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-emerald-600">
            {new Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            }).format(product.pricePerDay)}
            <span className="text-sm font-normal text-gray-500">/dia</span>
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className={`px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
              product.isAvailable 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label={product.isAvailable ? `Adicionar ${product.name} ao carrinho` : `${product.name} indisponível`}
            aria-disabled={!product.isAvailable}
          >
            {product.isAvailable ? 'Adicionar' : 'Indisponível'}
          </button>
        </div>
      </div>
    </article>
  );
};
