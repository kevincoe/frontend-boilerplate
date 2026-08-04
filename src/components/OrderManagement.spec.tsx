import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { OrderManagement } from "./OrderManagement";
import type { OrderResponse } from "../types";

const mockOrder: OrderResponse = {
  id: "order-1",
  customerId: "cust-1",
  customer: {
    name: "Maria Silva",
    document: "11122233344",
    phone: "11988887777",
    email: "maria@example.com",
  },
  pickUpDate: "2023-10-15T10:00:00.000Z",
  returnDate: "2023-10-20T10:00:00.000Z",
  state: "DRAFT",
  totalAmount: 350.5,
  assets: [],
};

describe("OrderManagement component", () => {
  it("should render loading state", () => {
    // There is no explicit loading text, just a spinner div, so we check for container
    const { container } = render(
      <OrderManagement orders={[]} onConfirmOrder={vi.fn()} loading={true} />,
    );
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("should render empty state if no orders are provided", () => {
    render(<OrderManagement orders={[]} onConfirmOrder={vi.fn()} />);
    expect(screen.getByText(/Nenhum pedido encontrado/i)).toBeInTheDocument();
  });

  it("should render a list of orders", () => {
    render(<OrderManagement orders={[mockOrder]} onConfirmOrder={vi.fn()} />);

    // Check if customer name is rendered
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();

    // Check if status is formatted correctly (DRAFT -> Orçamento (Aguardando))
    expect(screen.getByText("Orçamento (Aguardando)")).toBeInTheDocument();

    // Check total amount formatting (might have R$ 350.50, check by regex)
    expect(screen.getByText(/350/)).toBeInTheDocument();
  });

  it("should expand and show order details when clicked", () => {
    render(<OrderManagement orders={[mockOrder]} onConfirmOrder={vi.fn()} />);

    // Find the expand button (usually an arrow icon or clicking on the header)
    // Order header usually has role button or onClick
    const orderHeader =
      screen.getByText("Maria Silva").closest('div[role="button"]') ||
      screen.getByText("Maria Silva").parentElement;

    if (orderHeader) {
      fireEvent.click(orderHeader);
      // After click, details like email/phone should be visible
      expect(screen.getByText(/11122233344/)).toBeInTheDocument();
    }
  });

  it("should call onConfirmOrder when confirm button is clicked", () => {
    const mockOnConfirm = vi.fn();
    render(
      <OrderManagement orders={[mockOrder]} onConfirmOrder={mockOnConfirm} />,
    );

    // Expand order first
    const orderHeader =
      screen.getByText("Maria Silva").closest('div[role="button"]') ||
      screen.getByText("Maria Silva").parentElement;
    if (orderHeader) {
      fireEvent.click(orderHeader);
    }

    // Find confirm button
    const confirmButton = screen.getByRole("button", {
      name: /confirmar pagamento/i,
    });
    expect(confirmButton).toBeInTheDocument();

    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).toHaveBeenCalledWith("order-1", 350.5 / 2);
  });
});
