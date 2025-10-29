import { eq, and, gte, lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, produtos, movimentacoes, InsertProduto, InsertMovimentacao } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Funcoes para Produtos
export async function createProduto(data: InsertProduto) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(produtos).values(data);
  return result;
}

export async function getProdutoById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(produtos).where(eq(produtos.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getProdutoBySku(sku: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(produtos).where(eq(produtos.sku, sku)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function listProdutos() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(produtos);
}

export async function updateProduto(id: number, data: Partial<InsertProduto>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(produtos).set(data).where(eq(produtos.id, id));
}

// Funcoes para Movimentacoes
export async function createMovimentacao(data: InsertMovimentacao) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(movimentacoes).values(data);
}

export async function getMovimentacoesByProdutoId(produtoId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(movimentacoes).where(eq(movimentacoes.produtoId, produtoId));
}

export async function listMovimentacoes() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(movimentacoes);
}

// Funcoes para Relatorios
export async function getProdutosAbaixoDoEstoqueMinimo() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(produtos).where(
    lt(produtos.quantidadeAtual, produtos.quantidadeMinima)
  );
}

export async function getProdutosVencendoEm7Dias() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const hoje = new Date();
  const em7Dias = new Date(hoje.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  return await db.select().from(movimentacoes).where(
    and(
      gte(movimentacoes.dataValidade, hoje),
      lt(movimentacoes.dataValidade, em7Dias)
    )
  );
}

export async function calcularValorTotalEstoque() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(produtos);
  return result.reduce((total, p) => total + (p.quantidadeAtual * p.precoUnitario), 0);
}
