import React from "react";
import { Package, Star, DollarSign } from "lucide-react";
import type { Kit } from "../types/index";

interface KitListProps {
  kits: Kit[];
  loading?: boolean;
  error?: string;
  onToggleFavorite?: (kitId: string, isFavorited: boolean) => void;
  onUseKit?: (kit: Kit) => void;
}

export const KitList: React.FC<KitListProps> = ({
  kits,
  loading,
  error,
  onToggleFavorite,
  onUseKit,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (kits.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900">
          Nenhum Kit encontrado
        </h3>
        <p className="text-gray-500 mt-2 max-w-sm">
          Crie kits a partir da página de Cotação para agilizar suas vendas
          futuras.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kits.map((kit) => (
        <div
          key={kit.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
        >
          <div className="p-5 flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {kit.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[40px]">
                  {kit.description || "Sem descrição"}
                </p>
              </div>
              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(kit.id, !kit.isFavorited)}
                  className={`p-2 rounded-full transition-colors ${
                    kit.isFavorited
                      ? "text-yellow-500 hover:bg-yellow-50"
                      : "text-gray-400 hover:bg-gray-50"
                  }`}
                  title={
                    kit.isFavorited
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                >
                  <Star
                    className="w-5 h-5"
                    fill={kit.isFavorited ? "currentColor" : "none"}
                  />
                </button>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <h4 className="text-xs font-semibold text-gray-600 uppercase mb-2">
                Itens Inclusos ({kit.items.length})
              </h4>
              <ul className="space-y-1">
                {kit.items.slice(0, 3).map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 flex justify-between"
                  >
                    <span className="truncate mr-2">
                      {item.product?.name || item.productBaseId}
                    </span>
                    <span className="font-medium text-gray-900">
                      x{item.quantity}
                    </span>
                  </li>
                ))}
                {kit.items.length > 3 && (
                  <li className="text-sm text-gray-500 italic mt-1">
                    + {kit.items.length - 3} outros itens...
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="p-5 border-t border-gray-100 bg-white flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase font-semibold">
                Valor Sugerido
              </span>
              <span className="text-lg font-bold text-emerald-600 flex items-center">
                <DollarSign className="w-4 h-4 mr-0.5" />
                {kit.price.toFixed(2)}
              </span>
            </div>
            {onUseKit && (
              <button
                onClick={() => onUseKit(kit)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Usar Kit
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
