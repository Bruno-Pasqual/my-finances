import { Button, styled, TextField } from "@mui/material";
import { FormEvent } from "react";
import { infoTransaction, Transaction } from "../types/types";
import { useGlobalContext } from "../contexts/GlobalContext";
import { handleCreateTransaction } from "../controllers/transactionsController";
import { useToast } from "@/hooks/useToast";
import { ToastType } from "@/enums/enums";

interface TransactionFormProps {
	setFormOpen: (open: boolean) => void;
	setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function TransactionForm({
	setFormOpen,
	setTransactions,
}: TransactionFormProps) {
	const { showToast } = useToast();
	const { currentUserId } = useGlobalContext();

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

		const data: infoTransaction = {
			descricao: formData.get("descricao") as string,
			valor: Number.parseFloat(formData.get("valor") as string),
			titulo: formData.get("titulo") as string,
			tipo: formData.get("tipo") as string,
			userId: currentUserId!,
		};

		try {
			const newTransaction = await handleCreateTransaction(data);

			if (newTransaction) {
				console.log(newTransaction);
				form.reset();
				setFormOpen(false);
				showToast(ToastType.SUCCESS, "Transação criada com sucesso");
				setTransactions((current: Transaction[]) => [...current, newTransaction]);
			} else {
				showToast(ToastType.ERROR, "Alguma coisa deu errada");
			}
		} catch (error) {
			showToast(ToastType.ERROR, "Erro ao criar transação");
			console.error(error);
		}
	};

	return (
		<form
			className="text-white text-lg flex flex-col gap-y-4"
			onSubmit={handleSubmit}
		>
			<h1 className="text-3xl mb-8">Cadastrar transação</h1>
			<CustomTextField
				label="Título"
				variant="outlined"
				name="titulo"
				required
				type="text"
			/>
			<CustomTextField
				label="Descrição"
				variant="outlined"
				name="descricao"
				required
			/>
			<CustomTextField
				label="Valor"
				variant="outlined"
				name="valor"
				required
				type="number"
			/>

			<select
				name="tipo"
				className="text-slate-400 h-12 bg-transparent border border-slate-300 rounded-[4px] pl-[12px]"
				required
			>
				<option value="">Tipo de transação</option>
				<option value="receita">Receita</option>
				<option value="despesa">Despesa</option>
			</select>

			<Button variant="contained" type="submit" className="mt-4">
				Cadastrar
			</Button>
		</form>
	);
}
