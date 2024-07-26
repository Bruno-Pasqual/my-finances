"use client";

import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useRouter } from "next/navigation";
import React from "react";
import { CircularProgress, Paper, Stack } from "@mui/material";
import { Transaction } from "../types/types";
import { handleGetAllTransactions } from "../controllers/transactionsController";
import { useToast } from "@/hooks/useToast";
import { ToastType } from "@/enums/enums";
import { getFromLocalStorage } from "../utils/utils";
import TinyBarChart from "../components/shared/TinyBarChart";
import SimpleBarChart from "../components/shared/TinyBarChart";
import Spinner from "../components/shared/Spinner";

export default function Page() {
	const { session, currentUserId } = useGlobalContext();
	const { showToast } = useToast();

	const [loading, setLoading] = React.useState<boolean>(true);
	const [transactions, setTransactions] = React.useState<Transaction[]>([]);
	const router = useRouter();

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
		console.log("current user id: " + getFromLocalStorage("currentUserId"));
		setLoading(true);
		if (!session) {
			router.push("/");
		}
		async function getTransactions() {
			if (getFromLocalStorage("currentUserId")) {
				const transactions = await handleGetAllTransactions(currentUserId!);
				console.log(transactions);

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
				<Spinner />
			) : (
				<main className="    mx-auto mt-8  mb-8 border max-w-7xl md:w-10/12 md:p-10 border-zinc-800	 flex flex-col gap-y-10 ">
					<div className="">
						<p className=" px-4 text-2xl mb-12 text-primary">Situação financeira</p>
						{/* Container dos valores */}
						<div className="flex flex-col gap-y-4 md:gap-y-10 lg:flex-row lg:w-[100%] justify-between gap-x-8 mx-auto  border border-zinc-800 md:p-4 px-2">
							<div className="grow border border-green-600 rounded-md px-6 py-2  bg-green-950 ">
								<p className="text-green-700 ">Receitas</p>
								<p className="text-[20px] md:text-[30px] text-green-300">
									R$ ${totalReceitas?.toFixed(2) || "0,00"}
								</p>
							</div>
							<div className=" grow border border-red-600 rounded-md px-6 py-2   bg-red-950">
								<p className="text-red-700 ">Despesas</p>
								<p className="text-[20px] md:text-[30px] text-red-300">
									R$ {totalDespesas?.toFixed(2) || " 0,00"}
								</p>
							</div>
							<div className=" grow rounded-md  border-white-300 border border-zinc-600 px-6 py-2 ">
								<p>Saldo atual</p>
								<p className="text-[20px] md:text-[30px] text-white-300">
									R$ {(totalReceitas - totalDespesas).toFixed(2)}
								</p>
							</div>
						</div>
					</div>
					<div className="flex w-[100%] h-[400px]  flex-col lg:flex-row  border-zinc-800 md:p-4 px-2  mx-auto ">
						<div className=" grow  ">meta atual ativa</div>
						<div className=" md:p-4 mx-auto ">
							<p className="mb-4">Últimas 5 transações</p>
							<Paper className="border  border-zinc-700 w-fit rounded-xl bg-zinc-800">
								<SimpleBarChart transactions={transactions} />
							</Paper>
						</div>
					</div>
					<div></div>
					<div></div>
				</main>
			)}
		</div>
	);
}
