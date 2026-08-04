import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuoteForm } from "../components/QuoteForm";
import { useCartStore } from "../store/useCartStore";
import { createQuote } from "../services/ordersService";
import axios from "axios";
import { useKits } from "../hooks/useKits";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Save, Download } from "lucide-react";
import { KitList } from "../components/KitList";

const kitSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
});
type KitFormValues = z.infer<typeof kitSchema>;

export const QuotePage: React.FC = () => {
  const { items, clearCart, removeItem, updateQuantity } = useCartStore();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isSaveKitModalOpen, setIsSaveKitModalOpen] = useState(false);
  const [isImportKitModalOpen, setIsImportKitModalOpen] = useState(false);

  const { createKit, kits, isLoading: isKitsLoading } = useKits();

  const {
    register,
    handleSubmit: handleKitSubmit,
    formState: { errors: kitErrors },
    reset: resetKitForm,
  } = useForm<KitFormValues>({
    resolver: zodResolver(kitSchema),
  });

  const onSaveKit = async (data: KitFormValues) => {
    try {
      const price = items.reduce(
        (sum, i) => sum + i.product.pricePerDay * i.quantity,
        0,
      );
      await createKit({
        name: data.name,
        description: data.description || "",
        price,
        isFavorited: false,
        items: items.map((i) => ({
          productBaseId: i.product.id,
          quantity: i.quantity,
        })),
      });
      setIsSaveKitModalOpen(false);
      resetKitForm();
      alert("Kit salvo com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar kit");
    }
  };

  const onImportKit = (kit: import("../types/index").Kit) => {
    clearCart();
    kit.items.forEach((item) => {
      const product = item.product || item.productBase;
      if (product) {
        useCartStore.getState().addItem(product);
        useCartStore.getState().updateQuantity(product.id, item.quantity);
      }
    });
    setIsImportKitModalOpen(false);
  };

  const handleSubmitQuote = async (
    data: import("../types/index").CreateQuoteRequest,
  ) => {
    if (items.length === 0) {
      setError("Adicione pelo menos um produto ao carrinho");
      return;
    }

    try {
      setLoading(true);
      setError(undefined);

      const payload = {
        ...data,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        pickUpDate: new Date(data.pickUpDate).toISOString(),
        returnDate: new Date(data.returnDate).toISOString(),
      };

      await createQuote(payload);
      clearCart();
      navigate("/orders");
    } catch (err) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.error : null;
      setError(msg || "Erro ao criar cotação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Solicitar Cotação
            </h1>
            <p className="text-gray-600 mt-2">
              Selecione os produtos e preencha as informações
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Produtos Selecionados
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsImportKitModalOpen(true)}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-md hover:bg-emerald-100 transition-colors"
              >
                <Download className="w-4 h-4 mr-1.5" />
                Importar de um Kit
              </button>
              <button
                onClick={() => setIsSaveKitModalOpen(true)}
                disabled={items.length === 0}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-1.5" />
                Salvar como Kit
              </button>
            </div>
          </div>
          {items.length === 0 ? (
            <p className="text-gray-500">
              Nenhum produto selecionado. Selecione produtos do catálogo.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      R$ {item.product.pricePerDay}/dia un.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 mr-6">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-semibold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">
                      R$ {(item.product.pricePerDay * item.quantity).toFixed(2)}{" "}
                      /dia total
                    </span>
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
                <p className="text-lg font-bold">
                  Estimativa Total por dia: R${" "}
                  {items
                    .reduce(
                      (sum, i) => sum + i.product.pricePerDay * i.quantity,
                      0,
                    )
                    .toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <QuoteForm onSubmit={handleSubmitQuote} loading={loading} />
      </main>

      {/* Save Kit Modal */}
      {isSaveKitModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                Salvar como Kit
              </h3>
              <button
                onClick={() => setIsSaveKitModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={handleKitSubmit(onSaveKit)}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Kit
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                {kitErrors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {kitErrors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição (Opcional)
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSaveKitModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Kit Modal */}
      {isImportKitModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                Importar de um Kit
              </h3>
              <button
                onClick={() => setIsImportKitModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <KitList
                kits={kits}
                loading={isKitsLoading}
                onUseKit={onImportKit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
