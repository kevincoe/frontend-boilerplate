import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-emerald-600">Pegue-e-Monte</h1>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  to="/" 
                  className="text-gray-900 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Início
                </Link>
                <Link 
                  to="/products" 
                  className="text-gray-500 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Produtos
                </Link>
                <Link 
                  to="/quote" 
                  className="text-gray-500 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cotação
                </Link>
                <Link 
                  to="/orders" 
                  className="text-gray-500 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Meus Pedidos
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Aluguel de Câmeras Profissionais
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Encontre o equipamento ideal para suas produções cinematográficas com os melhores preços do mercado
          </p>
          <div className="space-x-4">
            <Link 
              to="/products" 
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium inline-block transition-colors"
            >
              Ver Produtos
            </Link>
            <Link 
              to="/quote" 
              className="border-2 border-white text-white hover:bg-emerald-700 px-8 py-3 rounded-md text-lg font-medium inline-block transition-colors"
            >
              Solicitar Cotação
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher o Pegue-e-Monte?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos os melhores equipamentos com serviços excepcionais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Equipamentos de Alta Qualidade</h3>
              <p className="text-gray-600">Todos os nossos equipamentos são mantidos em perfeitas condições e atualizados regularmente.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Entregamos os equipamentos rapidamente para que você não perca tempo em suas produções.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Suporte Especializado</h3>
              <p className="text-gray-600">Nossa equipe técnica está sempre pronta para ajudar você com qualquer dúvida ou problema.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Produtos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Confira nossa seleção de câmeras profissionais e acessórios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product cards would be rendered here */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Imagem do Produto</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Câmera DSLR Pro</h3>
                <p className="text-gray-600 mb-4">Câmera profissional com alta resolução e recursos avançados.</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">R$ 150/dia</span>
                  <Link 
                    to="/products" 
                    className="text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Imagem do Produto</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Câmera 4K</h3>
                <p className="text-gray-600 mb-4">Alta definição para produções cinematográficas de alto nível.</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">R$ 250/dia</span>
                  <Link 
                    to="/products" 
                    className="text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Imagem do Produto</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Acessório de Iluminação</h3>
                <p className="text-gray-600 mb-4">Kit completo para iluminação profissional.</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">R$ 80/dia</span>
                  <Link 
                    to="/products" 
                    className="text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-emerald-600 mb-4">Pegue-e-Monte</h3>
              <p className="text-gray-400">
                O melhor serviço de aluguel de câmeras profissionais para suas produções cinematográficas.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Início</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Produtos</Link></li>
                <li><Link to="/quote" className="text-gray-400 hover:text-white transition-colors">Cotação</Link></li>
                <li><Link to="/orders" className="text-gray-400 hover:text-white transition-colors">Meus Pedidos</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contato@pegueemonte.com.br</li>
                <li>(11) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Horário de Funcionamento</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Segunda a Sexta: 8h às 18h</li>
                <li>Sábado: 9h às 14h</li>
                <li>Domingo: Fechado</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Pegue-e-Monte. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};