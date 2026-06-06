import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Lazy loading features for performance optimization
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

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
        <CatalogPage />
      </Suspense>
    ),
  },
  {
    path: '/cart',
    element: (
      <Suspense fallback={<PageLoader />}>
        <CartPage />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminDashboard />
      </Suspense>
    ),
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
