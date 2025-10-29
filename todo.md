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
