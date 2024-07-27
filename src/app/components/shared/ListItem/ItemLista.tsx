import { Transaction } from "@/app/types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import PaymentsIcon from "@mui/icons-material/Payments";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useToast } from "@/hooks/useToast";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	ListItem,
} from "@mui/material";
import React, { useState } from "react";
import { handleDeleteTransaction } from "@/app/controllers/transactionsController";
import { ToastType } from "@/enums/enums";
import { Edit } from "@mui/icons-material";
import UpdateTransactionForm from "@/app/transacoes/updateTransacionForm";

interface ItemListaProps {
	transaction: Transaction;
	setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function ItemLista({
	transaction,
	setTransactions,
}: ItemListaProps) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [openEditForm, setOpenEditForm] = React.useState<boolean>(false);

	const { showToast } = useToast();

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = async (transactionId: number) => {
		try {
			const response = await handleDeleteTransaction(transactionId);
			if (response)
				showToast(ToastType.SUCCESS, "A transação foi removida com sucesso");

			setTransactions((prevTransactions) =>
				prevTransactions.filter((t) => t.id !== transactionId)
			);
			handleClose();
		} catch (error) {
			console.error("Failed to delete transaction:", error);
		}
	};

	const tipo =
		typeof transaction.tipo === "string" ? transaction.tipo.toLowerCase() : "";

	return (
		<ListItem
			className={`bg-fundojanelas rounded-md flex flex-col md:flex-row   gap-x-6 py-4  border-t border-b border-zinc-800  `}
		>
			{/* Ícone */}
			<div className="w-[20px] hidden md:block">
				{tipo === "despesa" ? (
					<PaymentsIcon className="text-red-600" />
				) : (
					<AttachMoneyIcon className="text-green-600" />
				)}
			</div>
			{/* Título e descrição */}
			<div className="w-[100%] md:flex md:justify-between">
				<p>{transaction.titulo}</p>
				<p className=" text-gray-300 opacity-70">{transaction.descricao}</p>
				<p>R${transaction.valor.toFixed(2)}</p>
			</div>
			{/* Container ações */}
			<div className="flex  mr-auto mt-6 md:mt-0 gap-x-6 md:items-center justify-center ">
				<div className=" cursor-pointer" onClick={() => setOpen(true)}>
					<DeleteIcon className="hover:text-primary" />
				</div>
				<div onClick={() => setOpenEditForm(true)}>
					<Edit className="hover:text-primary cursor-pointer" />
				</div>
			</div>

			<Dialog
				open={open}
				onClose={() => setOpenEditForm(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				sx={{
					"& .MuiBackdrop-root": {
						backgroundColor: "rgba(0, 0, 0, 0.6)",
					},
				}}
			>
				<DialogTitle className="text-primary" id="alert-dialog-title">
					{"Excluir a transação"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description" className="text-white">
						Você tem certeza que deseja excluir essa transação?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button className=" text-black" onClick={handleClose}>
						<p className="text-white">Cancelar</p>
					</Button>
					<Button
						onClick={() => handleDelete(transaction.id)}
						autoFocus
						className="bg-red-600 text-white"
					>
						Deletar
					</Button>
				</DialogActions>
			</Dialog>
			<UpdateTransactionForm
				open={openEditForm}
				setClose={setOpenEditForm}
				transaction={transaction}
				setOpenEditForm={setOpenEditForm}
				setTransactions={setTransactions}
			/>
		</ListItem>
	);
}
