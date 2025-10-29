import { InsertProduto } from "../../drizzle/schema";
import { createProduto, getProdutoById, getProdutoBySku, listProdutos, updateProduto, getProdutosAbaixoDoEstoqueMinimo } from "../db";

export class ProdutoService {
  /**
   * Validar categoria vs dados obrigatórios
   * Produtos perecíveis devem ter lote e data de validade (validados na movimentação)
   */
  static validarCategoria(categoria: string): boolean {
    return ["PERECIVEL", "NAO_PERECIVEL"].includes(categoria);
  }

  /**
   * Cadastrar novo produto
   * Validações:
   * - SKU único
   * - Categoria válida
   * - Preço positivo
   * - Quantidade mínima não negativa
   */
  static async cadastrarProduto(data: InsertProduto) {
    // Validar SKU
    if (!data.sku || data.sku.trim().length === 0) {
      throw new Error("SKU é obrigatório");
    }

    // Verificar se SKU já existe
    const produtoExistente = await getProdutoBySku(data.sku);
    if (produtoExistente) {
      throw new Error(`Produto com SKU ${data.sku} já existe`);
    }

    // Validar categoria
    if (!this.validarCategoria(data.categoria)) {
      throw new Error("Categoria inválida. Use PERECIVEL ou NAO_PERECIVEL");
    }

    // Validar preço
    if (data.precoUnitario < 0) {
      throw new Error("Preço unitário não pode ser negativo");
    }

    // Validar quantidade mínima
    if ((data.quantidadeMinima ?? 0) < 0) {
      throw new Error("Quantidade mínima não pode ser negativa");
    }

    // Validar nome
    if (!data.nome || data.nome.trim().length === 0) {
      throw new Error("Nome do produto é obrigatório");
    }

    return await createProduto(data);
  }

  /**
   * Verificar produtos abaixo do estoque mínimo
   */
  static async verificarEstoqueMinimo() {
    return await getProdutosAbaixoDoEstoqueMinimo();
  }

  /**
   * Listar todos os produtos
   */
  static async listarProdutos() {
    return await listProdutos();
  }

  /**
   * Obter produto por ID
   */
  static async obterProduto(id: number) {
    const produto = await getProdutoById(id);
    if (!produto) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }

  /**
   * Atualizar quantidade do produto
   */
  static async atualizarQuantidade(id: number, novaQuantidade: number) {
    if (novaQuantidade < 0) {
      throw new Error("Quantidade não pode ser negativa");
    }

    const produto = await this.obterProduto(id);
    return await updateProduto(id, { quantidadeAtual: novaQuantidade });
  }
}
