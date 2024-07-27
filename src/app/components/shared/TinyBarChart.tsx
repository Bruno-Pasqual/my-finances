import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { theme } from "@/app/Theme";
import { Transaction } from "@/app/types/types";

type SimpleBarChartProps = {
	transactions: Transaction[];
};

export default function SimpleBarChart(props: SimpleBarChartProps) {
	const valorTransacoes = props.transactions?.map((transaction: Transaction) => {
		return transaction.valor;
	});

	const labels = props.transactions.map((transaction) => {
		return transaction.descricao.length > 10
			? transaction.descricao.slice(0, 10) + "..."
			: transaction.descricao;
	});

	return (
		<BarChart
			width={320}
			height={300}
			series={[{ data: valorTransacoes, id: "pvId" }]}
			xAxis={[{ data: labels, scaleType: "band" }]}
		/>
	);
}
