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
import Spinner from "../components/shared/Spinner";

export default function Page() {
	const { session, currentUserId } = useGlobalContext();
	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(true);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [formOpen, setFormOpen] = useState<boolean>(false);
	const [formEditOpen, setFormEditOpen] = useState<boolean>(false);

	useEffect(() => {
		const getAllTransactions = async () => {
			setLoading(true);
			if (currentUserId) {
				const allTransactions = await handleGetAllTransactions(currentUserId);
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
		<div className="bg-fundobackground min-h-screen w-screen ">
			<Button
				variant="contained"
				className="fixed bottom-24 md:bottom-12 right-6 rounded-[50%] py-[20px] z-10"
				onClick={() => setFormOpen(true)}
			>
				<AddIcon />
			</Button>
			{loading ? (
				<p>
					<Spinner />
				</p>
			) : (
				<>
					{formOpen && (
						<div className="fixed inset-0 flex items-center justify-center z-20">
							<div
								className="fixed inset-0 bg-black opacity-80"
								onClick={() => setFormOpen(false)}
							></div>
							<div className="relative w-11/12 mx-auto md:px-8 md:py-12 bg-fundo max-w-[600px] z-30">
								<Paper className="px-4 md:px-8 py-8">
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
							<ul className="flex flex-col  mx-auto mb-20 border-zinc-800 md:border w-[90%] max-w-[1300px] p-2 gap-y-1">
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
