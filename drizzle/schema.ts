import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela de Produtos
 * Armazena informações sobre produtos perecíveis e não-perecíveis
 */
export const produtos = mysqlTable("produtos", {
  id: int("id").autoincrement().primaryKey(),
  sku: varchar("sku", { length: 64 }).notNull().unique(),
  nome: varchar("nome", { length: 255 }).notNull(),
  categoria: mysqlEnum("categoria", ["PERECIVEL", "NAO_PERECIVEL"]).notNull(),
  precoUnitario: int("precoUnitario").notNull(), // Armazenado em centavos para evitar decimais
  quantidadeMinima: int("quantidadeMinima").notNull().default(0),
  quantidadeAtual: int("quantidadeAtual").notNull().default(0),
  criadoEm: timestamp("criadoEm").defaultNow().notNull(),
  atualizadoEm: timestamp("atualizadoEm").defaultNow().onUpdateNow().notNull(),
});

export type Produto = typeof produtos.$inferSelect;
export type InsertProduto = typeof produtos.$inferInsert;

/**
 * Tabela de Movimentações de Estoque
 * Registra entradas e saídas de produtos
 */
export const movimentacoes = mysqlTable("movimentacoes", {
  id: int("id").autoincrement().primaryKey(),
  produtoId: int("produtoId").notNull().references(() => produtos.id),
  tipo: mysqlEnum("tipo", ["ENTRADA", "SAIDA"]).notNull(),
  quantidade: int("quantidade").notNull(),
  dataMov: timestamp("dataMov").defaultNow().notNull(),
  lote: varchar("lote", { length: 64 }),
  dataValidade: timestamp("dataValidade"),
  criadoEm: timestamp("criadoEm").defaultNow().notNull(),
});

export type Movimentacao = typeof movimentacoes.$inferSelect;
export type InsertMovimentacao = typeof movimentacoes.$inferInsert;