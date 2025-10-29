import { getProdutosAbaixoDoEstoqueMinimo, getProdutosVencendoEm7Dias, calcularValorTotalEstoque } from "../db";

export class RelatorioService {
  /**
   * Calcular valor total do estoque
   * Quantidade × Preço unitário para cada produto
   */
  static async calcularValorTotalEstoque() {
    const valorTotal = await calcularValorTotalEstoque();
    return {
      valorTotal: valorTotal / 100, // Converter de centavos para reais
      valorTotalCentavos: valorTotal,
    };
  }

  /**
   * Listar produtos que vencerão em até 7 dias
   */
  static async listarProdutosVencendoEm7Dias() {
    return await getProdutosVencendoEm7Dias();
  }

  /**
   * Identificar produtos com estoque abaixo do mínimo
   */
  static async listarProdutosAbaixoDoEstoqueMinimo() {
    return await getProdutosAbaixoDoEstoqueMinimo();
  }

  /**
   * Gerar relatório completo de estoque
   */
  static async gerarRelatorioCompleto() {
    const valorEstoque = await this.calcularValorTotalEstoque();
    const produtosVencendo = await this.listarProdutosVencendoEm7Dias();
    const produtosAbaixoMinimo = await this.listarProdutosAbaixoDoEstoqueMinimo();

    return {
      valorEstoque,
      produtosVencendo: produtosVencendo.length,
      produtosAbaixoMinimo: produtosAbaixoMinimo.length,
      alertas: {
        vencimento: produtosVencendo.length > 0,
        estoque: produtosAbaixoMinimo.length > 0,
      },
    };
  }
}
