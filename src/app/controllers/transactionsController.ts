"use server";

import {
	criarTransacao,
	deletarTransacao,
	listarTodasTransacoes,
} from "../Dao/TransactionDao";
import { infoTransaction, Transaction } from "../types/types";

export async function handleGetAllTransactions(
	currentUserId: number
): Promise<Transaction[]> {
	const transactions: Transaction[] = await listarTodasTransacoes(currentUserId);
	return transactions;
}

export async function handleCreateTransaction(
	transactionInfo: infoTransaction
): Promise<Transaction | null> {
	try {
		// Cria a nova transação usando a função `criarTransacao`
		const newTransaction = await criarTransacao(transactionInfo);

		// Retorna a nova transação, que deve conter um ID gerado
		return newTransaction;
	} catch (error) {
		console.error("Erro ao criar a transação:", error);
		// Pode lançar um erro ou retornar um valor padrão como `null`
		return null;
	}
}

export async function handleDeleteTransaction(
	transactionId: number
): Promise<Transaction> {
	const response = await deletarTransacao(transactionId);
	return response;
}
