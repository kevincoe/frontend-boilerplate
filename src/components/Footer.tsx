import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Pegue-e-Monte</h3>
            <p className="text-gray-300">
              A melhor solução para aluguel de câmeras profissionais.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-emerald-400 transition-colors">Início</a></li>
              <li><a href="/products" className="hover:text-emerald-400 transition-colors">Produtos</a></li>
              <li><a href="/quote" className="hover:text-emerald-400 transition-colors">Cotação</a></li>
              <li><a href="/orders" className="hover:text-emerald-400 transition-colors">Meus Pedidos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: contato@pegueemonte.com.br</li>
              <li>Telefone: (11) 99999-9999</li>
              <li>Endereço: São Paulo, SP</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Segunda a Sexta: 8h - 18h</li>
              <li>Sábado: 9h - 14h</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Pegue-e-Monte. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};