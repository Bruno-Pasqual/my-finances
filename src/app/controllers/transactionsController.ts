"use server";

import {
	createTransaction,
	deleteTransactionById,
	listAllTransactions,
} from "../Dao/TransactionDao";
import { infoTransaction, Transaction } from "../types/types";

export async function handleGetAllTransactions(
	currentUserId: number
): Promise<Transaction[]> {
	const transactions: Transaction[] = await listAllTransactions(currentUserId);
	return transactions;
}

export async function handleCreateTransaction(
	transactionInfo: infoTransaction
): Promise<Transaction | null> {
	try {
		const newTransaction = await createTransaction(transactionInfo);

		return newTransaction;
	} catch (error) {
		console.error("Erro ao criar a transação:", error);

		return null;
	}
}

export async function handleDeleteTransaction(
	transactionId: number
): Promise<Transaction> {
	const response = await deleteTransactionById(transactionId);
	return response;
}
