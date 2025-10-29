import { InsertMovimentacao } from "../../drizzle/schema";
import { createMovimentacao, getMovimentacoesByProdutoId, updateProduto, getProdutoById } from "../db";
import { ProdutoService } from "./produtoService";

export class MovimentacaoService {
  /**
   * Validar quantidade positiva
   */
  static validarQuantidade(quantidade: number): boolean {
    return quantidade > 0;
  }

  /**
   * Validar data de validade para perecíveis
   */
  static validarDataValidade(categoria: string, dataValidade?: Date): boolean {
    if (categoria === "PERECIVEL" && !dataValidade) {
      return false;
    }
    return true;
  }

  /**
   * Registrar entrada de estoque
   * Validações:
   * - Quantidade positiva
   * - Para perecíveis: lote e data de validade obrigatórios
   */
  static async registrarEntrada(produtoId: number, data: InsertMovimentacao) {
    // Validar quantidade
    if (!this.validarQuantidade(data.quantidade)) {
      throw new Error("Quantidade deve ser positiva");
    }

    // Obter produto
    const produto = await ProdutoService.obterProduto(produtoId);

    // Validar dados obrigatórios para perecíveis
    if (produto.categoria === "PERECIVEL") {
      if (!data.lote || data.lote.trim().length === 0) {
        throw new Error("Lote é obrigatório para produtos perecíveis");
      }
      if (!data.dataValidade) {
        throw new Error("Data de validade é obrigatória para produtos perecíveis");
      }
      if (data.dataValidade <= new Date()) {
        throw new Error("Data de validade não pode ser no passado");
      }
    }

    // Registrar movimentação
    const movimentacao = await createMovimentacao({
      ...data,
      produtoId,
      tipo: "ENTRADA",
    });

    // Atualizar quantidade do produto
    const novaQuantidade = produto.quantidadeAtual + data.quantidade;
    await updateProduto(produtoId, { quantidadeAtual: novaQuantidade });

    return movimentacao;
  }

  /**
   * Registrar saída de estoque
   * Validações:
   * - Quantidade positiva
   * - Estoque suficiente
   * - Para perecíveis: não pode sair após data de validade
   */
  static async registrarSaida(produtoId: number, data: InsertMovimentacao) {
    // Validar quantidade
    if (!this.validarQuantidade(data.quantidade)) {
      throw new Error("Quantidade deve ser positiva");
    }

    // Obter produto
    const produto = await ProdutoService.obterProduto(produtoId);

    // Verificar estoque suficiente
    if (produto.quantidadeAtual < data.quantidade) {
      throw new Error(
        `Estoque insuficiente. Disponível: ${produto.quantidadeAtual}, Solicitado: ${data.quantidade}`
      );
    }

    // Para perecíveis, validar data de validade
    if (produto.categoria === "PERECIVEL") {
      if (data.dataValidade && data.dataValidade <= new Date()) {
        throw new Error("Não é permitido saída de produto com data de validade vencida");
      }
    }

    // Registrar movimentação
    const movimentacao = await createMovimentacao({
      ...data,
      produtoId,
      tipo: "SAIDA",
    });

    // Atualizar quantidade do produto
    const novaQuantidade = produto.quantidadeAtual - data.quantidade;
    await updateProduto(produtoId, { quantidadeAtual: novaQuantidade });

    return movimentacao;
  }

  /**
   * Obter histórico de movimentações de um produto
   */
  static async obterHistorico(produtoId: number) {
    return await getMovimentacoesByProdutoId(produtoId);
  }
}
