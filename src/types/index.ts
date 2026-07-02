export interface Product {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  imageUrl: string;
  isAvailable: boolean;
  category: string;
  totalStock: number;
  availableStock: number;
}

export interface CreateQuoteRequest {
  customer: {
    name: string;
    email: string;
    phone: string;
    document: string;
  };
  items: { productId: string; quantity: number }[];
  pickUpDate: string;
  returnDate: string;
}

export interface QuoteResponse {
  id: string;
  customerId: string;
  pickUpDate: string;
  returnDate: string;
  items: { assetId: string }[];
  totalAmount: number;
}

export const PRODUCT_CATEGORIES = [
  'MOVEIS',
  'DECORACAO',
  'LOUÇAS',
  'TECIDOS',
  'ELETRONICOS',
  'GERAL'
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

export interface ConfirmOrderRequest {
  paymentAmount: number;
}

export interface DashboardStats {
  totalEquipment: number;
  rentedEquipment: number;
  activeCustomers: number;
  activeOrders: number;
  monthlyRevenue: number;
  recentOrders: {
    id: string;
    state: string;
    totalAmount: number;
    createdAt: string;
    customer: {
      name: string;
    };
  }[];
}

export interface OrderResponse {
  id: string;
  customerId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    document: string;
  };
  assets: {
    asset: {
      serialNumber: string;
      product: {
        name: string;
        dailyPrice: number;
        category: string;
      };
    };
  }[];
  pickUpDate: string;
  returnDate: string;
  state: 'DRAFT' | 'AWAITING_DEPOSIT' | 'RESERVED' | 'IN_PROGRESS' | 'PENDING_INSPECTION' | 'COMPLETED' | 'COMPLETED_WITH_DAMAGES';
  totalAmount: number;
}