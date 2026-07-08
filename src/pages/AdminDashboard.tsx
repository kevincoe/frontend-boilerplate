import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Users,
  Package,
  FileText,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { fetchDashboardStats } from "../services/dashboardService";
import type { DashboardStats } from "../types";

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (err) {
        setError("Erro ao carregar dados do dashboard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "DRAFT":
        return { color: "text-gray-500 bg-gray-100", label: "Orçamento" };
      case "AWAITING_DEPOSIT":
        return {
          color: "text-yellow-700 bg-yellow-100",
          label: "Aguardando Pagamento",
        };
      case "RESERVED":
        return { color: "text-blue-700 bg-blue-100", label: "Reservado" };
      case "IN_PROGRESS":
        return {
          color: "text-purple-700 bg-purple-100",
          label: "Em Andamento",
        };
      case "COMPLETED":
        return { color: "text-emerald-700 bg-emerald-100", label: "Concluído" };
      default:
        return { color: "text-gray-500 bg-gray-100", label: status };
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Visão Geral</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center animate-pulse"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertTriangle className="text-red-500 w-6 h-6 flex-shrink-0" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total de Equipamentos",
      value: stats?.totalEquipment || 0,
      icon: Package,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      title: "Equipamentos Indisponíveis",
      value: stats?.rentedEquipment || 0,
      icon: Package,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "Clientes Ativos (30d)",
      value: stats?.activeCustomers || 0,
      icon: Users,
      color: "text-sky-600",
      bg: "bg-sky-100",
    },
    {
      title: "Faturamento (Mês)",
      value: formatCurrency(stats?.monthlyRevenue || 0),
      icon: BarChart,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Visão Geral</h1>
        <p className="text-gray-500 mt-2">
          Acompanhe as métricas e atividades da sua locadora.
        </p>
      </div>

      {/* Cartões de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow"
          >
            <div className={`p-3 rounded-full ${stat.bg} mr-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Atividades Recentes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-bold text-gray-900">
              Atividades Recentes
            </h2>
            <Link
              to="/orders"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center transition-colors"
            >
              Ver todos <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order) => {
                const status = getStatusConfig(order.state);
                return (
                  <div
                    key={order.id}
                    className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                        {order.customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {order.customer.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Pedido criado em{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "pt-BR",
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                      >
                        {status.label}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-gray-500">
                Nenhuma atividade recente encontrada.
              </div>
            )}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Ações Rápidas
          </h2>
          <div className="flex flex-col gap-3">
            <Link
              to="/quote"
              className="group flex items-center justify-between bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl font-medium transition-colors shadow-sm"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-3 opacity-90 group-hover:opacity-100" />
                Novo Orçamento
              </div>
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              to="/equipment/new"
              className="group flex items-center justify-between bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 p-4 rounded-xl font-medium transition-all shadow-sm"
            >
              <div className="flex items-center">
                <Package className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100" />
                Cadastrar Equipamento
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </Link>

            <Link
              to="/orders"
              className="group flex items-center justify-between bg-white border border-gray-200 hover:border-sky-300 hover:bg-sky-50 text-gray-700 hover:text-sky-700 p-4 rounded-xl font-medium transition-all shadow-sm"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100" />
                Ver Pedidos
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
