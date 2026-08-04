import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Import all pages with lazy loading for code-splitting
const ProductsPage = React.lazy(() =>
  import("../pages/ProductsPage").then((m) => ({ default: m.ProductsPage })),
);
const QuotePage = React.lazy(() =>
  import("../pages/QuotePage").then((m) => ({ default: m.QuotePage })),
);
const OrdersPage = React.lazy(() =>
  import("../pages/OrdersPage").then((m) => ({ default: m.OrdersPage })),
);
const AdminDashboard = React.lazy(() =>
  import("../pages/AdminDashboard").then((m) => ({
    default: m.AdminDashboard,
  })),
);
const CreateEquipmentPage = React.lazy(() =>
  import("../pages/CreateEquipmentPage").then((m) => ({
    default: m.CreateEquipmentPage,
  })),
);

// Import layout components
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// Layout component with header and footer
const Layout: React.FC = () => (
  <>
    <Header />{" "}
    {/* TODO: Atualizar links de navegação para o contexto de CRM interno */}
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </>
);

// Accessible loader
const PageLoader = () => (
  <div
    className="flex items-center justify-center min-h-screen"
    role="status"
    aria-label="Carregando página"
  >
    <span className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "equipment",
        element: <ProductsPage />, // Lembre-se de renomear o arquivo para EquipmentPage.tsx
      },
      {
        path: "equipment/new",
        element: <CreateEquipmentPage />,
      },
      {
        path: "quote",
        element: <QuotePage />,
      },
      {
        path: "orders", // Gerenciamento de Pedidos/Aluguéis
        element: <OrdersPage />,
      },
      {
        path: "customers", // Futura rota para gerenciamento de clientes
        // element: <CustomersPage />,
      },
    ],
  },
]);

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};
