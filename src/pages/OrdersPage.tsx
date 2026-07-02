import React, { useState, useEffect } from 'react';
import { OrderManagement } from '../components/OrderManagement';
import { fetchOrders, confirmOrder, updateOrder, deleteOrder, finishOrder } from '../services/ordersService';
import type { OrderResponse } from '../types/index';
import { X, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  // Modais State
  const [editingOrder, setEditingOrder] = useState<OrderResponse | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<OrderResponse | null>(null);
  
  // Edit Form State
  const [editData, setEditData] = useState<{ pickUpDate: string, returnDate: string, totalAmount: number }>({
    pickUpDate: '',
    returnDate: '',
    totalAmount: 0
  });

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOrders();
  }, []);

  const handleConfirmOrder = async (orderId: string, amount: number) => {
    try {
      setError(undefined);
      await confirmOrder(orderId, { paymentAmount: amount });
      await loadOrders();
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) ? err.response?.data?.error : null;
      setError(errorMessage || 'Erro ao confirmar pedido');
    }
  };

  const handleEditOpen = (order: OrderResponse) => {
    setEditingOrder(order);
    setEditData({
      pickUpDate: new Date(order.pickUpDate).toISOString().slice(0, 16),
      returnDate: new Date(order.returnDate).toISOString().slice(0, 16),
      totalAmount: order.totalAmount
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    
    try {
      await updateOrder(editingOrder.id, {
        pickUpDate: new Date(editData.pickUpDate).toISOString(),
        returnDate: new Date(editData.returnDate).toISOString(),
        totalAmount: editData.totalAmount
      });
      setEditingOrder(null);
      await loadOrders();
    } catch (err) {
      const msg = axios.isAxiosError(err) ? (err.response?.data?.message || err.response?.data?.error) : null;
      alert(msg || 'Erro ao editar pedido');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingOrder) return;
    try {
      await deleteOrder(deletingOrder.id);
      setDeletingOrder(null);
      await loadOrders();
    } catch (err) {
      const msg = axios.isAxiosError(err) ? (err.response?.data?.message || err.response?.data?.error) : null;
      alert(msg || 'Erro ao excluir pedido');
    }
  };

  const handleFinishOrder = async (order: OrderResponse) => {
    if (!window.confirm('Tem certeza que deseja finalizar esta locação e devolver os equipamentos para o estoque?')) return;
    try {
      await finishOrder(order.id);
      await loadOrders();
      alert('Locação finalizada com sucesso. Equipamentos retornados ao estoque.');
    } catch (err) {
      const msg = axios.isAxiosError(err) ? (err.response?.data?.message || err.response?.data?.error) : null;
      alert(msg || 'Erro ao finalizar pedido');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 relative">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
            <p className="text-gray-600 mt-2">Gerencie seus pedidos e orçamentos</p>
          </div>
        </div>

        <OrderManagement 
          orders={orders}
          onConfirmOrder={handleConfirmOrder}
          loading={loading}
          error={error}
          onEdit={handleEditOpen}
          onDelete={(order) => setDeletingOrder(order)}
          onFinish={handleFinishOrder}
        />

        {/* Edit Order Modal */}
        {editingOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">Editar Pedido ou Orçamento</h3>
                <button onClick={() => setEditingOrder(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data de Retirada</label>
                    <input 
                      type="datetime-local" 
                      required 
                      value={editData.pickUpDate} 
                      onChange={e => setEditData({...editData, pickUpDate: e.target.value})} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data de Devolução</label>
                    <input 
                      type="datetime-local" 
                      required 
                      value={editData.returnDate} 
                      onChange={e => setEditData({...editData, returnDate: e.target.value})} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor Total (R$)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    required 
                    value={editData.totalAmount} 
                    onChange={e => setEditData({...editData, totalAmount: Number(e.target.value)})} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                  />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingOrder(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">Salvar Alterações</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Order Confirmation */}
        {deletingOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Excluir Pedido?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Tem certeza que deseja excluir este pedido? Orçamentos e Pedidos Finalizados podem ser apagados permanentemente. Pedidos em andamento devem ser finalizados antes.
              </p>
              <div className="flex justify-center gap-3">
                <button type="button" onClick={() => setDeletingOrder(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex-1">Cancelar</button>
                <button type="button" onClick={handleDeleteConfirm} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 flex-1">Sim, Excluir</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
