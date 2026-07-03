import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            Pegue-e-Monte
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Início</Link>
            <Link to="/equipment" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Produtos</Link>
            <Link to="/quote" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Cotação</Link>
            <Link to="/orders" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Meus Pedidos</Link>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button aria-label="Menu do Usuário" className="p-2 text-gray-700 hover:text-emerald-600 transition-colors rounded-full hover:bg-emerald-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            <button 
              aria-label="Menu Principal" 
              className="p-2 md:hidden text-gray-700 hover:text-emerald-600 transition-colors rounded-full hover:bg-emerald-50"
              onClick={toggleMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col space-y-2">
          <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-colors font-medium">Início</Link>
          <Link to="/equipment" onClick={closeMenu} className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-colors font-medium">Produtos</Link>
          <Link to="/quote" onClick={closeMenu} className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-colors font-medium">Cotação</Link>
          <Link to="/orders" onClick={closeMenu} className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-colors font-medium">Meus Pedidos</Link>
        </div>
      )}
    </header>
  );
};