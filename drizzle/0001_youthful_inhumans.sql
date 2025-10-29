CREATE TABLE `movimentacoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`produtoId` int NOT NULL,
	`tipo` enum('ENTRADA','SAIDA') NOT NULL,
	`quantidade` int NOT NULL,
	`dataMov` timestamp NOT NULL DEFAULT (now()),
	`lote` varchar(64),
	`dataValidade` timestamp,
	`criadoEm` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `movimentacoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `produtos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sku` varchar(64) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`categoria` enum('PERECIVEL','NAO_PERECIVEL') NOT NULL,
	`precoUnitario` int NOT NULL,
	`quantidadeMinima` int NOT NULL DEFAULT 0,
	`quantidadeAtual` int NOT NULL DEFAULT 0,
	`criadoEm` timestamp NOT NULL DEFAULT (now()),
	`atualizadoEm` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `produtos_id` PRIMARY KEY(`id`),
	CONSTRAINT `produtos_sku_unique` UNIQUE(`sku`)
);
--> statement-breakpoint
ALTER TABLE `movimentacoes` ADD CONSTRAINT `movimentacoes_produtoId_produtos_id_fk` FOREIGN KEY (`produtoId`) REFERENCES `produtos`(`id`) ON DELETE no action ON UPDATE no action;