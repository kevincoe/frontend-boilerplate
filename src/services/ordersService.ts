import apiClient from '../lib/api';
import { type CreateQuoteRequest, type QuoteResponse, type ConfirmOrderRequest, type OrderResponse } from '../types/index';

// Create a quote
export const createQuote = async (quoteData: CreateQuoteRequest) => {
  const response = await apiClient.post<QuoteResponse>('/orders/quotes', quoteData);
  return response.data;
};

// Confirm an order
export const confirmOrder = async (orderId: string, confirmationData: ConfirmOrderRequest) => {
  const response = await apiClient.post<OrderResponse>(`/orders/${orderId}/confirm`, confirmationData);
  return response.data;
};

// Finish an order
export const finishOrder = async (orderId: string) => {
  const response = await apiClient.post<OrderResponse>(`/orders/${orderId}/finish`);
  return response.data;
};

// Fetch all orders
export const fetchOrders = async () => {
  const response = await apiClient.get<OrderResponse[]>('/orders');
  return response.data;
};

// Update an order
export const updateOrder = async (orderId: string, data: { pickUpDate?: string; returnDate?: string; totalAmount?: number }) => {
  const response = await apiClient.put<OrderResponse>(`/orders/${orderId}`, data);
  return response.data;
};

// Delete an order
export const deleteOrder = async (orderId: string) => {
  await apiClient.delete(`/orders/${orderId}`);
};