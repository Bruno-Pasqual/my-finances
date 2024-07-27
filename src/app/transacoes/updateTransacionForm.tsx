"use client";

import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	styled,
	TextField,
} from "@mui/material";
import { FormEvent } from "react";
import { Transaction, updateTransactionInfo } from "../types/types";
import { handleUpdateTransaction } from "../controllers/transactionsController";

interface TransactionFormProps {
	open: boolean;
	setClose: React.Dispatch<React.SetStateAction<boolean>>;
	transaction: Transaction;
	setOpenEditForm: React.Dispatch<React.SetStateAction<boolean>>;
	setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function UpdateTransactionForm(props: TransactionFormProps) {
	const CustomTextField = styled(TextField)({
		"& label": {
			color: "#b3b3b3",
		},
		"& label.Mui-focused": {
			color: "#ffffff",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "#b3b3b3",
			},
			"&:hover fieldset": {
				borderColor: "#ffffff",
			},
			"&.Mui-focused fieldset": {
				borderColor: "#ffffff",
			},
			color: "#ffffff",
		},
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);

		const data: updateTransactionInfo = {
			id: props.transaction.id,
			descricao: formData.get("descricao") as string,
			valor: parseFloat(formData.get("valor") as string),
			titulo: formData.get("titulo") as string,
			tipo: formData.get("tipo") as string,
		};

		const response = await handleUpdateTransaction(data);
		if (response) {
			// Atualizar a lista de transações ou realizar outra ação necessária
			props.setTransactions((prev) =>
				prev.map((trans) => (trans.id === data.id ? response : trans))
			);
			props.setOpenEditForm(false);
		}
	};

	return (
		<Dialog
			open={props.open}
			onClose={() => props.setOpenEditForm(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			sx={{
				"& .MuiBackdrop-root": {
					backgroundColor: "rgba(0, 0, 0, 0.6)",
				},
			}}
		>
			<DialogContent>
				<p className="text-3xl mb-8 text-white">Atualizar a transação</p>
				<form
					className="text-white text-lg flex flex-col gap-y-4"
					onSubmit={handleSubmit}
				>
					<CustomTextField
						label="Título"
						variant="outlined"
						name="titulo"
						required
						type="text"
						defaultValue={props.transaction.titulo}
					/>
					<CustomTextField
						label="Descrição"
						variant="outlined"
						name="descricao"
						required
						defaultValue={props.transaction.descricao}
					/>
					<CustomTextField
						label="Valor"
						variant="outlined"
						name="valor"
						required
						type="number"
						defaultValue={props.transaction.valor}
					/>
					<select
						name="tipo"
						className="text-slate-400 h-12 bg-transparent border border-slate-300 rounded-[4px] pl-[12px]"
						required
						defaultValue={props.transaction.tipo}
					>
						<option value="">Tipo de transação</option>
						<option value="receita">Receita</option>
						<option value="despesa">Despesa</option>
					</select>
					<Button
						variant="contained"
						type="submit"
						className="mt-4 text-white font-semibold tracking-wide"
					>
						Atualizar
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
