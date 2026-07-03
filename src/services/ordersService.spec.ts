import { describe, it, expect, vi, beforeEach } from 'vitest';
import apiClient from '../lib/api';
import {
  createQuote,
  confirmOrder,
  finishOrder,
  fetchOrders,
  updateOrder,
  deleteOrder
} from './ordersService';
import type { CreateQuoteRequest, ConfirmOrderRequest, OrderResponse, QuoteResponse } from '../types/index';

vi.mock('../lib/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockOrderResponse: OrderResponse = {
  id: 'order-1',
  customerId: 'cust-1',
  customer: {
    name: 'João da Silva',
    document: '12345678901',
    phone: '11999999999',
    email: 'joao@example.com'
  },
  pickUpDate: '2023-10-10T10:00:00.000Z',
  returnDate: '2023-10-12T10:00:00.000Z',
  state: 'DRAFT',
  totalAmount: 200,
  assets: [],
};

const mockQuoteResponse: QuoteResponse = {
  id: 'quote-1',
  customerId: 'cust-1',
  pickUpDate: '2023-10-10T10:00:00.000Z',
  returnDate: '2023-10-12T10:00:00.000Z',
  items: [{ assetId: 'asset-1' }],
  totalAmount: 200,
};

describe('ordersService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createQuote', () => {
    it('should create a new quote', async () => {
      const payload: CreateQuoteRequest = {
        customer: {
          name: 'João da Silva',
          email: 'joao@example.com',
          phone: '11999999999',
          document: '12345678901',
        },
        pickUpDate: '2023-10-10T10:00:00.000Z',
        returnDate: '2023-10-12T10:00:00.000Z',
        items: [{ productId: 'product-1', quantity: 2 }],
      };

      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockQuoteResponse });

      const result = await createQuote(payload);

      expect(apiClient.post).toHaveBeenCalledWith('/orders/quotes', payload);
      expect(result).toEqual(mockQuoteResponse);
    });
  });

  describe('confirmOrder', () => {
    it('should confirm an order', async () => {
      const payload: ConfirmOrderRequest = { paymentAmount: 200 };
      const confirmedOrder = { ...mockOrderResponse, state: 'CONFIRMED' as const };

      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: confirmedOrder });

      const result = await confirmOrder('order-1', payload);

      expect(apiClient.post).toHaveBeenCalledWith('/orders/order-1/confirm', payload);
      expect(result).toEqual(confirmedOrder);
    });
  });

  describe('finishOrder', () => {
    it('should finish an order', async () => {
      const finishedOrder = { ...mockOrderResponse, state: 'FINISHED' as const };

      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: finishedOrder });

      const result = await finishOrder('order-1');

      expect(apiClient.post).toHaveBeenCalledWith('/orders/order-1/finish');
      expect(result).toEqual(finishedOrder);
    });
  });

  describe('fetchOrders', () => {
    it('should fetch all orders', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: [mockOrderResponse] });

      const result = await fetchOrders();

      expect(apiClient.get).toHaveBeenCalledWith('/orders');
      expect(result).toEqual([mockOrderResponse]);
    });
  });

  describe('updateOrder', () => {
    it('should update an order', async () => {
      const payload = { totalAmount: 250 };
      const updatedOrder = { ...mockOrderResponse, totalAmount: 250 };

      vi.mocked(apiClient.put).mockResolvedValueOnce({ data: updatedOrder });

      const result = await updateOrder('order-1', payload);

      expect(apiClient.put).toHaveBeenCalledWith('/orders/order-1', payload);
      expect(result).toEqual(updatedOrder);
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order', async () => {
      vi.mocked(apiClient.delete).mockResolvedValueOnce({});

      await deleteOrder('order-1');

      expect(apiClient.delete).toHaveBeenCalledWith('/orders/order-1');
    });
  });
});
