import React, { useState } from 'react';
import type { OrderResponse } from '../types/index';

interface OrderManagementProps {
  orders: OrderResponse[];
  onConfirmOrder: (orderId: string, amount: number) => void;
  loading?: boolean;
  error?: string;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({ orders, onConfirmOrder, loading, error }) => {
  const [confirmingOrder, setConfirmingOrder] = useState<string | null>(null);

  const handleConfirmOrder = (orderId: string, amount: number) => {
    setConfirmingOrder(orderId);
    onConfirmOrder(orderId, amount);
    setConfirmingOrder(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">Nenhum pedido encontrado.</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'AWAITING_DEPOSIT':
        return 'bg-yellow-100 text-yellow-800';
      case 'RESERVED':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':
        return 'bg-purple-100 text-purple-800';
      case 'PENDING_INSPECTION':
        return 'bg-orange-100 text-orange-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED_WITH_DAMAGES':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatus = (state: string) => {
    if (state === 'DRAFT') return 'Aguardando confirmação';
    if (state === 'AWAITING_DEPOSIT') return 'Aguardando depósito';
    if (state === 'RESERVED') return 'Reservado';
    if (state === 'IN_PROGRESS') return 'Em andamento';
    if (state === 'PENDING_INSPECTION') return 'Aguardando inspeção';
    if (state === 'COMPLETED') return 'Concluído';
    if (state === 'COMPLETED_WITH_DAMAGES') return 'Concluído com danos';
    return 'Desconhecido';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Período
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                  <div className="text-sm text-gray-500">Cliente: {order.customerId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(order.pickUpDate).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(order.returnDate).toLocaleDateString('pt-BR')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.state)}`}>
                    {getPaymentStatus(order.state)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {order.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {order.state === 'DRAFT' && (
                    <button
                      onClick={() => handleConfirmOrder(order.id, order.totalAmount)}
                      disabled={confirmingOrder === order.id}
                      className="text-emerald-600 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
                    >
                      {confirmingOrder === order.id ? 'Confirmando...' : 'Confirmar Pagamento'}
                    </button>
                  )}
                  {order.state === 'AWAITING_DEPOSIT' && (
                    <span className="text-yellow-600">Aguardando depósito</span>
                  )}
                  {order.state === 'RESERVED' && (
                    <span className="text-blue-600">Reservado</span>
                  )}
                  {order.state === 'IN_PROGRESS' && (
                    <span className="text-purple-600">Em andamento</span>
                  )}
                  {order.state === 'PENDING_INSPECTION' && (
                    <span className="text-orange-600">Aguardando inspeção</span>
                  )}
                  {order.state === 'COMPLETED' && (
                    <span className="text-green-600">Concluído</span>
                  )}
                  {order.state === 'COMPLETED_WITH_DAMAGES' && (
                    <span className="text-red-600">Com danos</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};