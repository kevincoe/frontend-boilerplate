import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Import all pages with correct export patterns
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { QuotePage } from '../pages/QuotePage';
import { OrdersPage } from '../pages/OrdersPage';
import { CatalogPage } from '../pages/CatalogPage';
import { CartPage } from '../pages/CartPage';
import { AdminDashboard } from '../pages/AdminDashboard';

// Import layout components
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// Layout component with header and footer
const Layout: React.FC = () => (
  <>
    <Header />
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </>
);

// Accessible loader
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen" role="status" aria-label="Carregando página">
    <span className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'quote',
        element: <QuotePage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'admin',
        element: <AdminDashboard />,
      },
    ],
  },
]);

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};
