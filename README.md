# Frontend CRM Pegue-e-Monte

A aplicação Frontend oficial da plataforma "Pegue-e-Monte", construída com as melhores práticas de UX/UI usando **React**, **TypeScript** e **Vite**.

## 🚀 Tecnologias

- **Framework:** React 19
- **Build Tool:** Vite
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS & Lucide React (Ícones)
- **Roteamento:** React Router DOM v7
- **Requisições:** Axios
- **Validação:** Zod
- **Gerenciamento de Estado:** Zustand

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
- **Store:** Gerenciamento de estado global com Zustand em `src/store`.
- **Types:** Definições de tipos fortemente tipadas em `src/types`.
- **Lib:** Bibliotecas e utilitários compartilhados em `src/lib`.

## 🏗️ Arquitetura e Padrões de Projeto

### Princípios de Engenharia e Arquitetura

1. **SOLID & Clean Code:**
   - Funções pequenas com responsabilidade única
   - Evite aninhamentos profundos (use Early Return / Guard Clauses)
   - Nomes descritivos em inglês para variáveis, funções e classes

2. **Design Patterns:**
   - Factory, Strategy, Repository quando resolvem problemas reais
   - Evite overengineering

3. **Tipagem Rigorosa:**
   - TypeScript configurado em modo `strict`
   - Nunca utilize o tipo `any`
   - Use `unknown` e faça asserções seguras para tipos desconhecidos

### Separação de Responsabilidades (Camadas)

1. **Routes:** Apenas mapeiam os endpoints para os controllers
2. **Components:** Camada UI com componentes reutilizáveis
3. **Hooks:** Lógica customizada reutilizável
4. **Services:** Camada de acesso a dados com validação Zod
5. **Store:** Gerenciamento de estado global com Zustand
6. **Types:** Definições de tipos fortemente tipadas

### Validação de Dados

- **Validação no Frontend:** Uso de Zod para validação em tempo de execução
- **Tipagem Forte:** Interfaces e tipos TypeScript rigorosos
- **Erros tratados:** Mensagens de erro amigáveis com fallbacks

### Gerenciamento de Estado

- **Estado Local:** Priorize o estado local dos componentes
- **Estado Global:** Zustand para estados que precisam ser compartilhados entre múltiplos componentes
- **Reatividade:** Componentes reagem automaticamente às mudanças de estado

### Acessibilidade (a11y)

- Atributos ARIA adequados
- Navegação por teclado
- Estados de foco visíveis
- Contraste adequado para textos

## 🛡️ Segurança e Performance

### Proteção

- CORS configurado corretamente
- Headers HTTP de segurança com helmet
- Rate Limiting para prevenir força bruta

### Dados Sensíveis

- Nunca hardcode credenciais
- Variáveis de ambiente (`process.env`)

### Performance

- Paginação para listas longas
- Queries otimizadas
- Índices adequados para buscas frequentes

## 🧪 Testes e Qualidade

### Cultura de Testes

- Código escrito pensando em testabilidade
- Fácil de mockar (Inversão de Dependência)
- Cobertura de testes unitários

### Arquitetura de Testes

- **Unit Tests:** Vitest com React Testing Library
- **Component Tests:** Testes de componentes React
- **Service Tests:** Testes de integração com API

## 📊 Padrões de Desenvolvimento

### Componentes

- Componentes pequenos e "dumb" (apenas UI)
- Complexidade extraída para Custom Hooks
- Reutilização máxima de componentes

### Serviços HTTP

- Axios com interceptors para autenticação e tratamento de erros
- Validação Zod para dados recebidos da API
- Tipagem forte para todos os dados

### Estados

- Estado local para componentes
- Zustand para estado global compartilhado
- Imutabilidade nos estados

## 🔄 Fluxo de Desenvolvimento

1. **Criação de Componente:**
   - Criar componente em `src/components/`
   - Adicionar testes unitários em `src/components/*spec.tsx`
   - Importar e usar no componente pai

2. **Adição de Funcionalidade:**
   - Criar hook customizado em `src/hooks/` se necessário
   - Criar serviço em `src/services/` para chamadas HTTP
   - Adicionar tipo em `src/types/`

3. **Testes:**
   - Escrever testes unitários com Vitest
   - Testar fluxos de erro e sucesso
   - Verificar integração entre camadas

## 📈 Melhores Práticas Implementadas

### Código

- Tipagem estrita em TypeScript
- Nomes descritivos e consistentes
- Componentes funcionais com hooks
- Estrutura de projeto clara e organizada

### Desempenho

- React.memo para componentes pesados
- Lazy loading para rotas
- Bundle optimization
- Código tree-shakeable

### Manutenibilidade

- Documentação clara em README
- Padrões de nomenclatura consistentes
- Estrutura de projeto modular
- Testes abrangentes

## 📋 Estrutura de Arquivos Detalhada

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx       # Cabeçalho com navegação
│   ├── Footer.tsx       # Rodapé da aplicação
│   ├── ProductCard.tsx  # Card de produto
│   ├── ProductList.tsx  # Lista de produtos
│   └── OrderManagement.tsx # Componente de gestão de pedidos
├── hooks/               # Hooks customizados
│   └── useProducts.ts   # Hook para gerenciamento de produtos
├── pages/               # Páginas principais
│   ├── HomePage.tsx     # Página inicial (Dashboard)
│   ├── ProductsPage.tsx # Catálogo e inventário
│   ├── QuotePage.tsx    # Cotação de serviços
│   ├── OrdersPage.tsx   # Gerenciamento de pedidos
│   └── AdminDashboard.tsx # Dashboard administrativo
├── services/            # Serviços HTTP
│   └── productsService.ts # Serviço para produtos
├── store/               # Estado global
│   └── useCartStore.ts  # Store do carrinho
├── types/               # Definições de tipos
│   ├── index.ts         # Tipos principais
│   ├── product.ts       # Tipo produto
│   └── order.ts         # Tipo pedido
├── lib/                 # Bibliotecas e utilitários
│   └── api.ts           # Cliente Axios configurado
├── routes/              # Configuração de rotas
│   └── AppRoutes.tsx    # Rotas principais da aplicação
└── main.tsx             # Ponto de entrada da aplicação
```

## 📝 Diretrizes de Desenvolvimento AI

### Papel e Persona

Assuma o papel de um Engenheiro de Software Senior e Arquiteto de Soluções Fullstack. Você é especialista em Node.js, React, TypeScript e ecossistemas Linux.

### Stack Tecnológica Base

- Backend: Node.js, Express, TypeScript
- Frontend: React, Vite, TypeScript, Tailwind CSS
- Validação: Zod
- Ferramental: Docker, tsx, tsup, ESLint, Prettier

### Princípios de Engenharia e Arquitetura

1. SOLID & Clean Code: Priorize funções pequenas, com responsabilidade única
2. Design Patterns: Utilize padrões adequados quando resolverem problemas reais
3. Nomenclatura: Use nomes descritivos em inglês para variáveis, funções e classes
4. Tipagem Rigorosa: TypeScript configurado em modo `strict`

### Regras de Frontend (React)

1. Arquitetura de Componentes: Mantenha componentes pequenos e burros
2. Gerenciamento de Estado: Priorize o estado local
3. Acessibilidade (a11y): Sempre inclua atributos ARIA adequados

### Segurança e Performance

1. Proteção: Implemente CORS, helmet e Rate Limiting
2. Dados Sensíveis: Nunca hardcode credenciais
3. Performance: Sugira paginação, queries otimizadas e índices adequados

### Testes e Qualidade

1. Cultura de Testes: Escreva código pensando em como ele será testado
2. Cobertura: Sempre sugira cenários de testes unitários cruciais para novas features

## 📈 Métricas de Desempenho

- **Bundle Size:** Otimizado com tree-shaking
- **Loading Performance:** Suspense e loading states
- **Memory Usage:** Gerenciamento eficiente de estado
- **Accessibility:** Compatível com WCAG 2.1

## 📋 Próximos Passos para Desenvolvimento

1. Implementar testes unitários abrangentes
2. Adicionar mais funcionalidades de administração
3. Melhorar a experiência do usuário em dispositivos móveis
4. Implementar mais recursos de segurança
5. Adicionar internacionalização (i18n)
