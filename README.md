# Frontend CRM Pegue-e-Monte

A aplicação Frontend oficial da plataforma "Pegue-e-Monte", construída com as melhores práticas de UX/UI usando **React**, **TypeScript** e **Vite**.

## 🚀 Tecnologias

- **Framework:** React
- **Build Tool:** Vite
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS & Lucide React (Ícones)
- **Roteamento:** React Router DOM
- **Requisições:** Axios

## 📦 Passos para Rodar Localmente

### 1. Clonar o projeto
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd frontend-boilerplate
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
O projeto pode se comunicar com o backend configurando as rotas da API. Você pode configurar ou criar um arquivo `.env` na raiz se houver customizações.
Por padrão, a URL base no `src/services/api.ts` aponta para o backend local. Certifique-se de que o backend esteja rodando na porta correta (geralmente `http://localhost:3333/api`).

### 4. Iniciar a Aplicação

Para rodar em ambiente de desenvolvimento:
```bash
npm run dev
```
O frontend estará acessível no navegador na porta padrão do Vite (geralmente `http://localhost:5173`).

Para criar o bundle de produção:
```bash
npm run build
```
O resultado será gerado na pasta `/dist`.

Para pré-visualizar a versão de produção gerada:
```bash
npm run preview
```

## 🧪 Como Testar a Plataforma

Após iniciar o Frontend e o Backend localmente, acesse `http://localhost:5173`:
1. **Página Inicial (Dashboard):** Verifique se o Skeleton Loader processa e entrega as métricas financeiras e contagem de estoque real vindas do banco de dados.
2. **Produtos:** Crie, edite e acompanhe o número de unidades em estoque.
3. **Cotações & Pedidos:** Mude o status do pedido para "Confirmado" e volte para Produtos: observe que as unidades físicas foram dadas como indisponíveis. Utilize o botão "Finalizar Aluguel" para devolvê-las.

## 📐 Estrutura do Projeto

- **Pages:** Páginas principais da solução (`Dashboard`, `Products`, `Orders`, etc) em `src/pages`.
- **Components:** Componentes de interface reutilizáveis (`OrderManagement`, modais) em `src/components`.
- **Services:** Interceptadores de API HTTP via Axios com abstração de tipagem em `src/services`.
- **Hooks:** React Custom Hooks para separar lógica da camada visual em `src/hooks`.
