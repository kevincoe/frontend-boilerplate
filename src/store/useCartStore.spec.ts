import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "./useCartStore";
import type { Product } from "../types/product";

const mockProduct: Product = {
  id: "product-1",
  name: "Mesa de Jantar",
  description: "Mesa de madeira maciça.",
  pricePerDay: 100,
  category: "MOVEIS",
  imageUrl: "",
  isAvailable: true,
  totalStock: 10,
  availableStock: 10,
};

describe("useCartStore", () => {
  beforeEach(() => {
    // Limpa o store antes de cada teste
    useCartStore.getState().clearCart();
  });

  it("should start with an empty cart", () => {
    expect(useCartStore.getState().items).toEqual([]);
  });

  it("should add a new product to the cart", () => {
    useCartStore.getState().addItem(mockProduct);

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({ product: mockProduct, quantity: 1 });
  });

  it("should increment quantity if the product is already in the cart", () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct);

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("should remove a product from the cart", () => {
    useCartStore.getState().addItem(mockProduct);
    expect(useCartStore.getState().items).toHaveLength(1);

    useCartStore.getState().removeItem(mockProduct.id);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("should update the quantity of a product", () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().updateQuantity(mockProduct.id, 5);

    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it("should remove the product if updated quantity is 0 or less", () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().updateQuantity(mockProduct.id, 0);

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("should calculate the total price correctly", () => {
    const product2: Product = {
      ...mockProduct,
      id: "product-2",
      pricePerDay: 50,
    };

    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct); // 2 * 100 = 200
    useCartStore.getState().addItem(product2); // 1 * 50 = 50

    const total = useCartStore.getState().getCartTotal();
    expect(total).toBe(250);
  });

  it("should clear the cart", () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
