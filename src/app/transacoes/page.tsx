"use client";

import { useRouter } from "next/navigation";
import { useGlobalContext } from "../contexts/GlobalContext";
import React, { useEffect, useState } from "react";
import { Transaction } from "../types/types";
import { handleGetAllTransactions } from "../controllers/transactionsController";
import { Button, Paper } from "@mui/material";
import TransactionForm from "./TransactionForm";
import AddIcon from "@mui/icons-material/Add";
import ItemLista from "../components/shared/ListItem/ItemLista";
import { getFromLocalStorage } from "../utils/utils";

export default function Page() {
	const { session, currentUserId } = useGlobalContext();
	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(true);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [formOpen, setFormOpen] = useState<boolean>(false);

	useEffect(() => {
		const getAllTransactions = async () => {
			setLoading(true);
			if (getFromLocalStorage("currentUserId")) {
				const allTransactions = await handleGetAllTransactions(
					getFromLocalStorage("currentUserId")
				);
				setTransactions(allTransactions);
				setLoading(false);
			}
		};

		if (!session) {
			router.push("/");
		} else {
			getAllTransactions();
		}
	}, [session, router, currentUserId]);

	return (
		<div className="bg-fundobackground min-h-screen w-screen">
			<Button
				variant="contained"
				className="fixed bottom-24 md:bottom-12 right-6 rounded-[50%] py-[20px] z-10"
				onClick={() => setFormOpen(true)}
			>
				<AddIcon />
			</Button>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					{formOpen && (
						<div className="fixed inset-0 flex items-center justify-center z-20">
							<div
								className="fixed inset-0 bg-black opacity-80"
								onClick={() => setFormOpen(false)}
							></div>
							<div className="relative w-10/12 mx-auto px-8 py-10 md:px-8 md:py-12 bg-fundo max-w-[600px] z-30">
								<Paper className="px-8 py-12">
									<TransactionForm
										setFormOpen={setFormOpen}
										setTransactions={setTransactions}
									/>
								</Paper>
							</div>
						</div>
					)}
					{transactions.length === 0 ? (
						<div className="w-10/12 mx-auto px-8 py-10 md:px-8 md:py-12  max-w-[600px]">
							<p className="text-white">Você não tem nenhuma transação registrada</p>
							<Button
								className="mt-8"
								variant="contained"
								onClick={() => setFormOpen(true)}
							>
								Registrar a primeira
							</Button>
						</div>
					) : (
						<div className="flex flex-col  mx-auto ">
							<h1 className=" text-3xl mt-8 ml-6 mb-8 ">Transações realizadas</h1>
							<ul className="flex flex-col w-11/12 md:max-w-[700px] gap-y-4  mx-auto mb-16">
								{transactions.map((transaction: Transaction) => (
									<ItemLista
										setTransactions={setTransactions}
										key={transaction.id}
										transaction={transaction}
									/>
								))}
							</ul>
						</div>
					)}
				</>
			)}
		</div>
	);
}
