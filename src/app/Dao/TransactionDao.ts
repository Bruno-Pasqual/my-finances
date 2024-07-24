import { PrismaClient } from "@prisma/client";
import { infoTransaction, Transaction } from "../types/types";

const prisma = new PrismaClient();

// Criar Transação
export async function criarTransacao(transaction: infoTransaction) {
	try {
		const novaTransacao = await prisma.transaction.create({
			data: {
				descricao: transaction.descricao,
				valor: transaction.valor,
				titulo: transaction.titulo,
				tipo: transaction.tipo,
				userId: transaction.userId,
			},
		});
		return novaTransacao;
	} catch (error) {
		return null;
	}
}

// Deletar Transação
export async function deletarTransacao(id: number): Promise<Transaction> {
	const transacaoDeletada = await prisma.transaction.delete({
		where: { id },
	});
	return transacaoDeletada;
}

// Ler Transação por ID
export async function lerTransacaoPorId(id: number) {
	const transacao = await prisma.transaction.findUnique({
		where: { id },
	});
	return transacao;
}

// Listar Todas as Transações
export async function listarTodasTransacoes(
	currentUserId: number
): Promise<Transaction[]> {
	const transacoes: Transaction[] = await prisma.transaction.findMany({
		where: {
			userId: currentUserId,
		},
	});
	return transacoes;
}

// Listar Transações com Filtro de Tipo (Descrição)
export async function listarTransacoesPorDescricao(descricaoFiltro: string) {
	const transacoes = await prisma.transaction.findMany({
		where: {
			descricao: {
				contains: descricaoFiltro,
			},
		},
	});
	return transacoes;
}

// Alterar Transação
export async function alterarTransacao(
	id: number,
	valor: number,
	descricao: string
) {
	const transacaoAtualizada = await prisma.transaction.update({
		where: { id },
		data: {
			valor,
			descricao,
		},
	});
	return transacaoAtualizada;
}
