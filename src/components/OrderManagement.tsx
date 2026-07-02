import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
  User,
  Mail,
  Phone,
  FileText,
  CalendarDays,
  DollarSign,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import type { OrderResponse } from '../types/index';

interface OrderManagementProps {
  orders: OrderResponse[];
  onConfirmOrder: (orderId: string, amount: number) => void;
  loading?: boolean;
  error?: string;
  onEdit?: (order: OrderResponse) => void;
  onDelete?: (order: OrderResponse) => void;
  onFinish?: (order: OrderResponse) => void;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({ orders, onConfirmOrder, loading, error, onEdit, onDelete, onFinish }) => {
  const [confirmingOrder, setConfirmingOrder] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const handleConfirmOrder = (orderId: string, amount: number) => {
    setConfirmingOrder(orderId);
    onConfirmOrder(orderId, amount);
    setConfirmingOrder(null);
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: FileText, label: 'Orçamento (Aguardando)' };
      case 'AWAITING_DEPOSIT':
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Aguardando Depósito' };
      case 'RESERVED':
        return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle, label: 'Reservado' };
      case 'IN_PROGRESS':
        return { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Package, label: 'Em Andamento (Locado)' };
      case 'PENDING_INSPECTION':
        return { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: AlertTriangle, label: 'Inspeção Pendente' };
      case 'COMPLETED':
        return { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle, label: 'Concluído' };
      case 'COMPLETED_WITH_DAMAGES':
        return { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle, label: 'Concluído (Com Danos)' };
      default:
        return { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: FileText, label: 'Desconhecido' };
    }
  };

  const getItemsSummary = (order: OrderResponse) => {
    if (!order.assets || order.assets.length === 0) return 'Nenhum item';

    // Agrupa por nome do produto
    const counts: Record<string, number> = {};
    order.assets.forEach(a => {
      const name = a.asset?.product?.name;
      if (name) {
        counts[name] = (counts[name] || 0) + 1;
      }
    });

    const entries = Object.entries(counts);
    if (entries.length === 0) return 'Itens não identificados';

    const firstItem = entries[0];

    if (entries.length === 1) {
      return `${firstItem[1]}x ${firstItem[0]}`;
    }

    return `${firstItem[1]}x ${firstItem[0]} e mais ${order.assets.length - firstItem[1]} itens...`;
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertTriangle className="text-red-500 w-6 h-6 flex-shrink-0" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
          <Package className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Nenhum pedido encontrado</h3>
          <p className="text-gray-500 mt-2 max-w-sm">Você ainda não possui orçamentos ou aluguéis ativos em sua conta.</p>
        </div>
      ) : (
        orders.map((order) => {
          const isExpanded = expandedOrder === order.id;
          const statusConfig = getStatusConfig(order.state);
          const StatusIcon = statusConfig.icon;

          return (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-emerald-200 transition-colors">
              {/* Card Header (Always Visible) */}
              <div
                className="p-5 flex flex-col md:flex-row md:items-center justify-between cursor-pointer gap-4"
                onClick={() => toggleExpand(order.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-sm font-bold text-gray-900">#{order.id.split('-')[0].toUpperCase()}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                      <StatusIcon className="w-3.5 h-3.5 mr-1" />
                      {statusConfig.label}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 flex items-center mt-2">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    {order.customer?.name || 'Cliente não identificado'}
                  </h3>
                </div>

                <div className="flex items-center gap-8 md:gap-12">
                  <div className="hidden md:block text-sm">
                    <p className="text-gray-500 flex items-center mb-1">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      {new Date(order.pickUpDate).toLocaleDateString('pt-BR')} até {new Date(order.returnDate).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-gray-600 font-medium flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      {getItemsSummary(order)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <div className="flex flex-col items-end mr-2">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Valor Total</span>
                    <span className="text-lg font-bold text-gray-900 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.totalAmount)}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === order.id ? null : order.id); }}
                      className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {menuOpenId === order.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => { setMenuOpenId(null); onEdit?.(order); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-2" /> Editar Datas / Valor
                        </button>
                        {(order.state === 'AWAITING_DEPOSIT' || order.state === 'RESERVED' || order.state === 'IN_PROGRESS' || order.state === 'PENDING_INSPECTION') && (
                          <button 
                            onClick={() => { setMenuOpenId(null); onFinish?.(order); }}
                            className="w-full text-left px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 flex items-center"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" /> Finalizar Aluguel
                          </button>
                        )}
                        <div className="border-t border-gray-100 my-1"></div>
                        <button 
                          onClick={() => { setMenuOpenId(null); onDelete?.(order); }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Excluir Pedido
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleExpand(order.id); }}
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
                </div>
              </div>

              {/* Expanded Details Section */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Customer Info */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Detalhes do Locatário</h4>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-700 flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="font-medium">{order.customer?.name || 'N/A'}</span>
                        </p>
                        <p className="text-sm text-gray-700 flex items-center">
                          <Mail className="w-4 h-4 text-gray-400 mr-3" />
                          {order.customer?.email || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-700 flex items-center">
                          <Phone className="w-4 h-4 text-gray-400 mr-3" />
                          {order.customer?.phone || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-700 flex items-center">
                          <FileText className="w-4 h-4 text-gray-400 mr-3" />
                          CPF/CNPJ: {order.customer?.document || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Order Info & Actions */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Financeiro & Ações</h4>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">ID Completo</span>
                          <span className="font-mono text-gray-900">{order.id}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Total a Pagar</span>
                          <span className="font-medium text-emerald-600 flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            R$ {Number(order.totalAmount).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {order.state === 'DRAFT' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConfirmOrder(order.id, Number(order.totalAmount));
                          }}
                          disabled={confirmingOrder === order.id}
                          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {confirmingOrder === order.id ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Confirmar Pagamento e Reservar
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Equipamentos Reservados ({order.assets?.length || 0})</h4>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <ul className="divide-y divide-gray-200">
                        {order.assets?.map((item, idx) => (
                          <li key={idx} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 rounded bg-emerald-100 flex items-center justify-center">
                                <Package className="h-5 w-5 text-emerald-600" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{item.asset?.product?.name || 'Desconhecido'}</p>
                                <p className="text-xs text-gray-500">Série: {item.asset?.serialNumber || 'N/A'}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {item.asset?.product?.category || 'Geral'}
                              </span>
                            </div>
                          </li>
                        ))}
                        {(!order.assets || order.assets.length === 0) && (
                          <li className="p-4 text-center text-sm text-gray-500">Nenhum item associado.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};