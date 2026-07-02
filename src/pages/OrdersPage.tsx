import React, { useState, useEffect } from 'react';
import { OrderManagement } from '../components/OrderManagement';
import { fetchOrders, confirmOrder } from '../services/ordersService';
import type { OrderResponse } from '../types/index';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError('Erro ao carregar pedidos');
        console.error('Error loading orders:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleConfirmOrder = async (orderId: string, amount: number) => {
    try {
      await confirmOrder(orderId, { paymentAmount: amount });
      // Refresh orders after confirmation
      const updatedOrders = await fetchOrders();
      setOrders(updatedOrders);
    } catch (err) {
      setError('Erro ao confirmar pedido');
      console.error('Error confirming order:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
            <p className="text-gray-600 mt-2">Gerencie seus pedidos e cotações</p>
          </div>
        </div>

        <OrderManagement 
          orders={orders}
          onConfirmOrder={handleConfirmOrder}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
};
