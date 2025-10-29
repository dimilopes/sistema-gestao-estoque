# Sistema de Gestão de Estoque


Dimitris Tzirnazoglou Assis Lopes - RM: 550120 
Joao Vitor Nava - RM: 98623


Um sistema completo para gerenciamento de estoque de produtos perecíveis e não-perecíveis, com controle de lotes, datas de validade e alertas automáticos.

## Descrição das Regras de Negócio Implementadas

### Produtos
- **Código SKU**: Identificador único obrigatório para cada produto
- **Categoria**: Classificação em PERECIVEL ou NAO_PERECIVEL
- **Preço Unitário**: Valor em centavos (sem decimais)
- **Quantidade Mínima**: Nível de alerta para reposição de estoque
- **Quantidade Atual**: Saldo atual em tempo real

### Movimentações de Estoque
- **Tipo**: ENTRADA (compra/devolução) ou SAIDA (venda/consumo)
- **Quantidade**: Deve ser sempre positiva
- **Lote**: Obrigatório para produtos perecíveis
- **Data de Validade**: Obrigatória para produtos perecíveis

### Validações Implementadas
1. **Produtos Perecíveis**: Requerem lote e data de validade
2. **Quantidade Positiva**: Nenhuma movimentação com quantidade negativa
3. **Estoque Suficiente**: Validação antes de registrar saída
4. **Data de Validade**: Não permite movimentações de produtos vencidos
5. **Alertas de Estoque Mínimo**: Identifica produtos abaixo do limite
6. **Cálculo de Saldo**: Atualização automática após cada movimentação

## Diagrama das Entidades

```
┌─────────────────┐
│    PRODUTOS     │
├─────────────────┤
│ id (PK)         │
│ sku (UNIQUE)    │
│ nome            │
│ categoria       │
│ precoUnitario   │
│ quantidadeMin   │
│ quantidadeAtual │
│ criadoEm        │
│ atualizadoEm    │
└────────┬────────┘
         │ 1:N
         │
┌────────▼──────────────┐
│  MOVIMENTACOES        │
├───────────────────────┤
│ id (PK)               │
│ produtoId (FK)        │
│ tipo (ENTRADA/SAIDA)  │
│ quantidade            │
│ dataMov               │
│ lote                  │
│ dataValidade          │
│ criadoEm              │
└───────────────────────┘
```

## Exemplos de Requisições API

### 1. Criar um Produto

```bash
curl -X POST http://localhost:3000/api/trpc/estoque.criarProduto \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "PROD001",
    "nome": "Leite Integral",
    "categoria": "PERECIVEL",
    "precoUnitario": 450,
    "quantidadeMinima": 10
  }'
```

### 2. Listar Todos os Produtos

```bash
curl http://localhost:3000/api/trpc/estoque.listarProdutos
```

### 3. Registrar Entrada de Estoque

```bash
curl -X POST http://localhost:3000/api/trpc/estoque.registrarEntrada \
  -H "Content-Type: application/json" \
  -d '{
    "produtoId": 1,
    "quantidade": 50,
    "lote": "LOTE001",
    "dataValidade": "2025-12-31T23:59:59Z"
  }'
```

### 4. Registrar Saída de Estoque

```bash
curl -X POST http://localhost:3000/api/trpc/estoque.registrarSaida \
  -H "Content-Type: application/json" \
  -d '{
    "produtoId": 1,
    "quantidade": 10
  }'
```

### 5. Obter Histórico de Movimentações

```bash
curl http://localhost:3000/api/trpc/estoque.obterHistorico?input={"produtoId":1}
```

### 6. Gerar Relatório Completo

```bash
curl http://localhost:3000/api/trpc/estoque.relatorioCompleto
```

### 7. Listar Produtos Abaixo do Estoque Mínimo

```bash
curl http://localhost:3000/api/trpc/estoque.produtosAbaixoMinimo
```

### 8. Listar Produtos Vencendo em 7 Dias

```bash
curl http://localhost:3000/api/trpc/estoque.produtosVencendo
```

## Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou pnpm

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/dimilopes/sistema-gestao-estoque.git
cd sistema-gestao-estoque
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure o banco de dados:
```bash
pnpm db:push
```

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

### Estrutura do Projeto

```
sistema-gestao-estoque/
├── drizzle/                    # Configuração e migrations do banco
│   ├── schema.ts              # Definição das tabelas
│   └── *.sql                  # Arquivos de migração
├── server/
│   ├── services/              # Lógica de negócio
│   │   ├── produtoService.ts
│   │   ├── movimentacaoService.ts
│   │   └── relatorioService.ts
│   ├── db.ts                  # Funções de acesso ao banco
│   └── routers.ts             # Definição das rotas tRPC
├── client/                    # Interface frontend
│   └── src/
│       ├── pages/
│       ├── components/
│       └── App.tsx
└── README.md
```

## Tecnologias Utilizadas

- **Backend**: Node.js + Express + tRPC
- **Frontend**: React 19 + TypeScript
- **Banco de Dados**: MySQL com Drizzle ORM
- **Validação**: Zod
- **Styling**: Tailwind CSS

## Commits Realizados

1. **Etapa 1 - Modelagem do domínio**: Definição das entidades e estrutura do banco de dados
2. **Etapa 2 - Implementação das regras de negócio**: Serviços de produto, movimentação e relatórios
3. **Etapa 3 - Validações e tratamento de erros**: Implementação de todas as validações e tratamento de exceções
4. **Etapa 4 - Documentação e entrega**: README completo com exemplos e instruções

## Tag de Versão

A tag `versao-final` marca a versão final e entregável do projeto.

## Licença

MIT
