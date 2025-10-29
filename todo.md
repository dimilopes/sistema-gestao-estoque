# Sistema de Gestão de Estoque - TODO

## Etapa 1 - Modelagem do Domínio
- [x] Modelar entidade Produto (SKU, Nome, Categoria, Preço, Quantidade Mínima, Data de Criação)
- [x] Modelar entidade Movimentação de Estoque (Tipo, Quantidade, Data, Lote, Data de Validade)
- [x] Configurar banco de dados (H2 em memória ou similar)
- [x] Criar estrutura inicial do projeto
- [x] Commit: "Etapa 1 - Modelagem do domínio"

## Etapa 2 - Implementacao das Regras de Negocio
- [x] Servico de Produto: Validacao de categoria vs dados obrigatorios
- [x] Servico de Produto: Metodo para verificar produtos abaixo do estoque minimo
- [x] Servico de Produto: Cadastro completo de produtos
- [x] Servico de Movimentacao: Validar quantidade positiva
- [x] Servico de Movimentacao: Verificar estoque suficiente para saidas
- [x] Servico de Movimentacao: Atualizar saldo do produto automaticamente
- [x] Servico de Movimentacao: Validar data de validade para pereciveis
- [x] Servico de Movimentacao: Implementar entrada e saida de estoque
- [x] Servico de Relatorios: Calcular valor total do estoque
- [x] Servico de Relatorios: Listar produtos que vencerao em ate 7 dias
- [x] Servico de Relatorios: Identificar produtos com estoque abaixo do minimo
- [x] Commit: "Etapa 2 - Implementacao das regras de negocio"

## Etapa 3 - Validacoes e Tratamento de Erros
- [x] Validacao: Tentativa de cadastrar produto perecivel sem data de validade
- [x] Validacao: Tentativa de saida com quantidade maior que estoque disponivel
- [x] Validacao: Movimentacao com quantidade negativa
- [x] Validacao: Produto perecivel nao pode ter movimentacao apos data de validade
- [x] Validacao: Alertas de estoque minimo funcionando corretamente
- [x] Validacao: Calculo correto do saldo apos movimentacoes
- [x] Implementar tratamento de excecoes personalizadas
- [x] Commit: "Etapa 3 - Validacoes e tratamento de erros"

## Etapa 4 - Documentação e Entrega
- [ ] Atualizar README.md com descrição das regras de negócio
- [ ] Adicionar diagrama simples das entidades no README
- [ ] Adicionar exemplos de requisições API no README
- [ ] Adicionar instruções de como executar o projeto
- [ ] Verificar se todos os comprovantes estão no repositório
- [ ] Criar tag "versao-final"
- [ ] Commit final com documentação
