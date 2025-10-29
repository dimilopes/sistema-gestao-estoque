# Sistema de Gestão de Estoque - TODO

## Etapa 1 - Modelagem do Domínio
- [ ] Modelar entidade Produto (SKU, Nome, Categoria, Preço, Quantidade Mínima, Data de Criação)
- [ ] Modelar entidade Movimentação de Estoque (Tipo, Quantidade, Data, Lote, Data de Validade)
- [ ] Configurar banco de dados (H2 em memória ou similar)
- [ ] Criar estrutura inicial do projeto
- [ ] Commit: "Etapa 1 - Modelagem do domínio"

## Etapa 2 - Implementação das Regras de Negócio
- [ ] Serviço de Produto: Validação de categoria vs dados obrigatórios
- [ ] Serviço de Produto: Método para verificar produtos abaixo do estoque mínimo
- [ ] Serviço de Produto: Cadastro completo de produtos
- [ ] Serviço de Movimentação: Validar quantidade positiva
- [ ] Serviço de Movimentação: Verificar estoque suficiente para saídas
- [ ] Serviço de Movimentação: Atualizar saldo do produto automaticamente
- [ ] Serviço de Movimentação: Validar data de validade para perecíveis
- [ ] Serviço de Movimentação: Implementar entrada e saída de estoque
- [ ] Serviço de Relatórios: Calcular valor total do estoque
- [ ] Serviço de Relatórios: Listar produtos que vencerão em até 7 dias
- [ ] Serviço de Relatórios: Identificar produtos com estoque abaixo do mínimo
- [ ] Commit: "Etapa 2 - Implementação das regras de negócio"

## Etapa 3 - Validações e Tratamento de Erros
- [ ] Validação: Tentativa de cadastrar produto perecível sem data de validade
- [ ] Validação: Tentativa de saída com quantidade maior que estoque disponível
- [ ] Validação: Movimentação com quantidade negativa
- [ ] Validação: Produto perecível não pode ter movimentação após data de validade
- [ ] Validação: Alertas de estoque mínimo funcionando corretamente
- [ ] Validação: Cálculo correto do saldo após movimentações
- [ ] Implementar tratamento de exceções personalizadas
- [ ] Commit: "Etapa 3 - Validações e tratamento de erros"

## Etapa 4 - Documentação e Entrega
- [ ] Atualizar README.md com descrição das regras de negócio
- [ ] Adicionar diagrama simples das entidades no README
- [ ] Adicionar exemplos de requisições API no README
- [ ] Adicionar instruções de como executar o projeto
- [ ] Verificar se todos os comprovantes estão no repositório
- [ ] Criar tag "versao-final"
- [ ] Commit final com documentação
