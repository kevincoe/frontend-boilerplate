import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            Pegue-e-Monte
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Início</Link>
            <Link to="/equipment" className="text-gray-700 hover:text-emerald-600 transition-colors">Produtos</Link>
            <Link to="/quote" className="text-gray-700 hover:text-emerald-600 transition-colors">Cotação</Link>
            <Link to="/orders" className="text-gray-700 hover:text-emerald-600 transition-colors">Meus Pedidos</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button aria-label="Menu do Usuário" className="p-2 text-gray-700 hover:text-emerald-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};