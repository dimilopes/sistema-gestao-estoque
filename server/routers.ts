import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { ProdutoService } from "./services/produtoService";
import { MovimentacaoService } from "./services/movimentacaoService";
import { RelatorioService } from "./services/relatorioService";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  estoque: router({
    // Procedimentos de Produtos
    criarProduto: publicProcedure
      .input(z.object({
        sku: z.string(),
        nome: z.string(),
        categoria: z.enum(["PERECIVEL", "NAO_PERECIVEL"]),
        precoUnitario: z.number().int(),
        quantidadeMinima: z.number().int().default(0),
      }))
      .mutation(async ({ input }) => {
        try {
          await ProdutoService.cadastrarProduto({
            sku: input.sku,
            nome: input.nome,
            categoria: input.categoria,
            precoUnitario: input.precoUnitario,
            quantidadeMinima: input.quantidadeMinima,
            quantidadeAtual: 0,
          });
          return { sucesso: true, mensagem: "Produto criado com sucesso" };
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Erro ao criar produto");
        }
      }),

    listarProdutos: publicProcedure.query(async () => {
      try {
        return await ProdutoService.listarProdutos();
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro ao listar produtos");
      }
    }),

    obterProduto: publicProcedure
      .input(z.object({ id: z.number().int() }))
      .query(async ({ input }) => {
        try {
          return await ProdutoService.obterProduto(input.id);
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Erro ao obter produto");
        }
      }),

    // Procedimentos de Movimentacoes
    registrarEntrada: publicProcedure
      .input(z.object({
        produtoId: z.number().int(),
        quantidade: z.number().int().positive(),
        lote: z.string().optional(),
        dataValidade: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          await MovimentacaoService.registrarEntrada(input.produtoId, {
            produtoId: input.produtoId,
            tipo: "ENTRADA",
            quantidade: input.quantidade,
            lote: input.lote,
            dataValidade: input.dataValidade,
          });
          return { sucesso: true, mensagem: "Entrada registrada com sucesso" };
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Erro ao registrar entrada");
        }
      }),

    registrarSaida: publicProcedure
      .input(z.object({
        produtoId: z.number().int(),
        quantidade: z.number().int().positive(),
        dataValidade: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          await MovimentacaoService.registrarSaida(input.produtoId, {
            produtoId: input.produtoId,
            tipo: "SAIDA",
            quantidade: input.quantidade,
            dataValidade: input.dataValidade,
          });
          return { sucesso: true, mensagem: "Saida registrada com sucesso" };
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Erro ao registrar saida");
        }
      }),

    obterHistorico: publicProcedure
      .input(z.object({ produtoId: z.number().int() }))
      .query(async ({ input }) => {
        try {
          return await MovimentacaoService.obterHistorico(input.produtoId);
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Erro ao obter historico");
        }
      }),

    // Procedimentos de Relatorios
    relatorioCompleto: publicProcedure.query(async () => {
      try {
        return await RelatorioService.gerarRelatorioCompleto();
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro ao gerar relatorio");
      }
    }),

    produtosAbaixoMinimo: publicProcedure.query(async () => {
      try {
        return await RelatorioService.listarProdutosAbaixoDoEstoqueMinimo();
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro ao listar produtos abaixo do minimo");
      }
    }),

    produtosVencendo: publicProcedure.query(async () => {
      try {
        return await RelatorioService.listarProdutosVencendoEm7Dias();
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro ao listar produtos vencendo");
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
