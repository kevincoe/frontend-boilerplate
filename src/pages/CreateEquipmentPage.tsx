import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Tag,
  DollarSign,
  AlignLeft,
  Layers,
  ArrowLeft,
  Save,
} from "lucide-react";
import { createProduct } from "../services/productsService";
import axios from "axios";
import { PRODUCT_CATEGORIES } from "../types";

const EquipmentSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  description: z.string().optional(),
  category: z.enum(
    ["MOVEIS", "DECORACAO", "LOUÇAS", "TECIDOS", "ELETRONICOS", "GERAL"],
    {
      message: "A categoria é obrigatória.",
    },
  ),
  pricePerDay: z.number().positive("O preço deve ser um número positivo."),
  stock: z.number().int().min(0, "O estoque não pode ser negativo."),
});

type EquipmentFormData = z.infer<typeof EquipmentSchema>;

export const CreateEquipmentPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EquipmentFormData>({
    resolver: zodResolver(EquipmentSchema),
  });

  const onSubmit: SubmitHandler<EquipmentFormData> = async (data) => {
    try {
      await createProduct({
        ...data,
        imageUrl: "",
        description: data.description || "",
      });
      alert("Equipamento criado com sucesso!");
      navigate("/equipment");
    } catch (error) {
      console.error("Falha ao criar equipamento:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;
      alert(errorMessage || "Ocorreu um erro ao criar o equipamento.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/equipment")}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar para o Inventário
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 text-emerald-600">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Novo Equipamento
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Cadastre um novo item no acervo e defina a quantidade física
                (estoque).
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 md:p-8 space-y-8">
              {/* Seção 1: Informações Básicas */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-6">
                  Informações Principais
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nome do Equipamento *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        placeholder="Ex: Cadeira Tiffany Dourada"
                        {...register("name")}
                        className={`block w-full pl-10 pr-3 py-2.5 border ${errors.name ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500"} rounded-lg shadow-sm focus:outline-none focus:border-emerald-500 sm:text-sm transition-colors`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-red-600 font-medium">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Categoria *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Layers className="h-4 w-4 text-gray-400" />
                      </div>
                      <select
                        id="category"
                        {...register("category")}
                        className={`block w-full pl-10 pr-10 py-2.5 border ${errors.category ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500"} rounded-lg shadow-sm focus:outline-none focus:border-emerald-500 sm:text-sm transition-colors appearance-none bg-white`}
                      >
                        <option value="">Selecione uma categoria...</option>
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    {errors.category && (
                      <p className="mt-1.5 text-sm text-red-600 font-medium">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Descrição do Produto
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <AlignLeft className="h-4 w-4 text-gray-400" />
                      </div>
                      <textarea
                        id="description"
                        placeholder="Descreva o material, dimensões e uso recomendado..."
                        {...register("description")}
                        rows={4}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção 2: Precificação e Estoque */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-6">
                  Valores e Quantidade física
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="pricePerDay"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preço da Diária (R$) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="pricePerDay"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("pricePerDay", { valueAsNumber: true })}
                        className={`block w-full pl-10 pr-3 py-2.5 border ${errors.pricePerDay ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500"} rounded-lg shadow-sm focus:outline-none focus:border-emerald-500 sm:text-sm transition-colors`}
                      />
                    </div>
                    {errors.pricePerDay && (
                      <p className="mt-1.5 text-sm text-red-600 font-medium">
                        {errors.pricePerDay.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Unidades em Estoque *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="stock"
                        type="number"
                        placeholder="Ex: 50"
                        {...register("stock", { valueAsNumber: true })}
                        className={`block w-full pl-10 pr-3 py-2.5 border ${errors.stock ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500"} rounded-lg shadow-sm focus:outline-none focus:border-emerald-500 sm:text-sm transition-colors`}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Isso criará {`{N}`} sub-registros de ativos para
                      rastreamento serializado.
                    </p>
                    {errors.stock && (
                      <p className="mt-1.5 text-sm text-red-600 font-medium">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/equipment")}
                className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? "Cadastrando..." : "Cadastrar Equipamento"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
