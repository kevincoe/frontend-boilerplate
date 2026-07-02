import React, { useState, useRef, useEffect } from 'react';
import { Package, AlertTriangle, CheckCircle, Tag, MoreVertical, Edit, Trash2, SlidersHorizontal } from 'lucide-react';
import type { Product } from '../types/index';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onAdjustStock?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onEdit, onDelete, onAdjustStock }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);
  // Cálculo de nível de estoque
  const stockPercentage = product.totalStock > 0 ? (product.availableStock / product.totalStock) * 100 : 0;
  const isLowStock = stockPercentage > 0 && stockPercentage <= 20;
  const isOutOfStock = product.availableStock === 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col h-full">
      <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative overflow-hidden group">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.png';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100">
            <Package className="w-10 h-10 mb-2 opacity-20" />
            <span className="text-sm font-medium opacity-50">Sem imagem</span>
          </div>
        )}
        
        {/* Category Badge overlay and Menu */}
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 shadow-sm backdrop-blur-sm">
            <Tag className="w-3 h-3 mr-1" />
            {product.category || 'Geral'}
          </span>
          <div className="relative" ref={menuRef}>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
              className="p-1 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-emerald-600 shadow-sm backdrop-blur-sm transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-10">
                <button 
                  onClick={() => { setShowMenu(false); onEdit?.(product); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" /> Editar Info
                </button>
                <button 
                  onClick={() => { setShowMenu(false); onAdjustStock?.(product); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" /> Ajustar Estoque
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  onClick={() => { setShowMenu(false); onDelete?.(product); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Excluir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1">{product.name}</h3>
          <span className="text-lg font-black text-emerald-600 whitespace-nowrap">R$ {product.pricePerDay.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-500 mt-1 text-sm line-clamp-2 flex-1">{product.description || 'Sem descrição cadastrada.'}</p>
        
        {/* Stock Indicator Area */}
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium flex items-center">
              <Package className="w-4 h-4 mr-1.5 text-gray-400" />
              Estoque
            </span>
            <span className={`font-bold ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-emerald-600'}`}>
              {product.availableStock} / {product.totalStock}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-orange-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${stockPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              {isOutOfStock ? (
                <span className="flex items-center text-xs font-medium text-red-600">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Indisponível
                </span>
              ) : isLowStock ? (
                <span className="flex items-center text-xs font-medium text-orange-600">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Acabando
                </span>
              ) : (
                <span className="flex items-center text-xs font-medium text-emerald-600">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" /> Disponível
                </span>
              )}
            </div>
            
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm
                ${product.availableStock > 0
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              }`}
              disabled={product.availableStock === 0}
              onClick={() => onAddToCart && onAddToCart(product)}
            >
              {product.availableStock > 0 ? 'Alugar' : 'Esgotado'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};