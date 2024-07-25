"use client";

import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useRouter } from "next/navigation";
import React from "react";
import { CircularProgress } from "@mui/material";
import { Transaction } from "../types/types";
import { handleGetAllTransactions } from "../controllers/transactionsController";
import { useToast } from "@/hooks/useToast";
import { ToastType } from "@/enums/enums";
import { getFromLocalStorage } from "../utils/utils";

export default function Page() {
	const { session, currentUserId } = useGlobalContext();
	const router = useRouter();

	const [loading, setLoading] = React.useState<boolean>(true);
	const [transactions, setTransactions] = React.useState<Transaction[]>([]);
	const { showToast } = useToast();

	const totalReceitas = transactions?.reduce((cc, transaction) => {
		if (transaction.tipo === "receita") {
			return cc + transaction.valor;
		}
		return cc;
	}, 0);

	const totalDespesas = transactions?.reduce((cc, transaction) => {
		if (transaction.tipo === "receita") {
			return cc + transaction.valor;
		}
		return cc;
	}, 0);

	useEffect(() => {
		console.log(getFromLocalStorage("currentUserId"));
		setLoading(true);
		if (!session) {
			router.push("/");
		}
		async function getTransactions() {
			if (getFromLocalStorage("currentUserId")) {
				const transactions = await handleGetAllTransactions(currentUserId!);
				if (transactions) setTransactions(transactions);
			} else {
				showToast(
					ToastType.ERROR,
					"Algo não está certo, por favor relogue no sistema"
				);
			}
		}

		getTransactions();

		setLoading(false);
	}, [session, router]);

	return (
		<div className="bg-fundobackground h-screen w-screen">
			{loading ? (
				<CircularProgress size={200} className="fixed left-2/4 top-2/4" />
			) : (
				<main className=" w-11/12   mx-auto mt-8  mb-8 max-w-[1000px]">
					<div>
						<p className="text-4xl mb-12">Situação financeira</p>
						<div className="flex flex-col gap-y-10 lg:flex-row w-[320px] lg:w-[100%] justify-between gap-x-8 mx-auto mb-36">
							<div className=" grow border xs border-green-600 rounded-md h-30 md:h-40 pt-5 pl-10 bg-green-950">
								<p className="text-green-700 ">Receitas totais</p>
								<p className="text-[50px] text-green-300">
									R$ ${totalReceitas?.toFixed(2) || "0,00"}
								</p>
							</div>
							<div className=" grow border border-red-600 rounded-md h-30 md:h-40 pt-5 pl-10 bg-red-950">
								<p className="text-red-700 ">Receitas totais</p>
								<p className="text-[50px] text-red-300">
									R$ {totalDespesas?.toFixed(2) || " 0,00"}
								</p>
							</div>
							<div className=" grow  h-30 md:h-40 pt-5 pl-10 rounded-md  border-green-300 border">
								<p>Saldo atual</p>
								<p className=" text-[50px] text-green-700">
									R$ {(totalReceitas - totalDespesas).toFixed(2)}
								</p>
							</div>
						</div>
					</div>
				</main>
			)}
		</div>
	);
}
