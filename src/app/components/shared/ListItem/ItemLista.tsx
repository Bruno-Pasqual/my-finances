import { Transaction } from "@/app/types/types";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
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

interface ItemListaProps {
	transaction: Transaction;
	setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function ItemLista({
	transaction,
	setTransactions,
}: ItemListaProps) {
	const [open, setOpen] = useState(false);

	const { showToast } = useToast();

	const handleClickOpen = () => {
		setOpen(true);
	};

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
			className={`bg-fundojanelas rounded-md flex gap-x-6 py-6 w-11/12 mx-auto`}
		>
			{tipo === "despesa" ? (
				<KeyboardDoubleArrowDownIcon className="text-red-600" />
			) : (
				<KeyboardDoubleArrowUpIcon className="text-green-600" />
			)}
			<div>
				<p className={`${tipo === "despesa" ? "text-red-600" : "text-green-600"}`}>
					{transaction.titulo}
				</p>
				<p className="mt-2 text-gray-300 opacity-70">{transaction.descricao}</p>
			</div>
			<div className="ml-auto hover:cursor-pointer" onClick={handleClickOpen}>
				<DeleteIcon />
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
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
		</ListItem>
	);
}
