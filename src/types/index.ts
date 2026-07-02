export interface Product {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  imageUrl: string;
  isAvailable: boolean;
  category: string;
}

export interface CreateQuoteRequest {
  customerId: string;
  assetIds: string[];
  pickUpDate: string;
  returnDate: string;
}

export interface QuoteResponse {
  id: string;
  customerId: string;
  pickUpDate: string;
  returnDate: string;
  state: 'DRAFT';
  totalAmount: number;
}

export interface ConfirmOrderRequest {
  paymentAmount: number;
}

export interface OrderResponse {
  id: string;
  customerId: string;
  pickUpDate: string;
  returnDate: string;
  state: 'DRAFT' | 'AWAITING_DEPOSIT' | 'RESERVED' | 'IN_PROGRESS' | 'PENDING_INSPECTION' | 'COMPLETED' | 'COMPLETED_WITH_DAMAGES';
  totalAmount: number;
}