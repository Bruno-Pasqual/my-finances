import { PrismaClient } from "@prisma/client";
import { infoTransaction, Transaction } from "../types/types";

const prisma = new PrismaClient();

export async function createTransaction(transaction: infoTransaction) {
	try {
		const novaTransacao = await prisma.transaction.create({
			data: {
				descricao: transaction.descricao,
				valor: transaction.valor,
				titulo: transaction.titulo,
				tipo: transaction.tipo,
				userId: transaction.userId,
				dataCriacao: new Date(),
			},
		});
		return novaTransacao;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function deleteTransactionById(id: number): Promise<Transaction> {
	const transacaoDeletada = await prisma.transaction.delete({
		where: { id },
	});
	return transacaoDeletada;
}

export async function readTransactionById(id: number) {
	const transacao = await prisma.transaction.findUnique({
		where: { id },
	});
	return transacao;
}

export async function listAllTransactions(
	currentUserId: number
): Promise<Transaction[]> {
	const transacoes: Transaction[] = await prisma.transaction.findMany({
		where: {
			userId: currentUserId,
		},
	});
	return transacoes;
}

//dara tempo ?
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
