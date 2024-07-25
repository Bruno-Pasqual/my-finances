import { Button } from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "sonner";
import { isValidEmailFormat } from "@/app/utils/utils";
import { useToast } from "@/hooks/useToast";
import { ToastType } from "@/enums/enums";
import { OperationResponse } from "@/app/types/types";
import { CustomTextField } from "../shared/CustomTextField";
import {
	handleCadastro,
	handleEmailAvaliable,
} from "@/app/controllers/UserController";

interface FormCadastroProps {
	setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function FormCadastro(props: FormCadastroProps) {
	const { showToast } = useToast();
	const [file, setFile] = useState<File | null>(null);

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
		setValue: React.Dispatch<React.SetStateAction<number>>
	) => {
		event.preventDefault();
		let data = new FormData(event.currentTarget);
		let imagePath: string | null = "";

		if (file) {
			data.append("image", file);
			try {
				const res = await fetch("/api/upload", {
					method: "POST",
					body: data,
				});

				if (!res.ok) {
					const errorText = await res.text();
					throw new Error(errorText);
				}

				const responseData = await res.json();

				if (responseData.success) {
					imagePath = responseData.filePath;
					showToast(
						ToastType.SUCCESS,
						`imagem armazenada em: ${responseData.filePath}`
					);
				} else {
					console.error("Upload falhou:", responseData.message);
				}
			} catch (error) {
				console.error("Erro no upload:");
			}
		}

		const email = data.get("email") as string;
		const isEmailAvaliable: boolean = await handleEmailAvaliable(email);

		if (!isEmailAvaliable) {
			showToast(ToastType.ERROR, "O email já está em uso");
			return;
		}

		let response: OperationResponse | null = await handleCadastro(
			data,
			imagePath
		);

		if (response.success) {
			showToast(ToastType.SUCCESS, response.msg);
			setValue(0);
		} else {
			showToast(ToastType.ERROR, response.msg);
		}
	};

	const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
		const email: string = event.target.value;
		if (!isValidEmailFormat(email)) return;
		const isEmailAvaliable: boolean = await handleEmailAvaliable(email);

		if (!isEmailAvaliable) showToast(ToastType.ERROR, "O email já está em uso");
	};

	return (
		<form
			className="text-white text-lg flex flex-col gap-y-4"
			onSubmit={(e) => handleSubmit(e, props.setValue)}
		>
			<h1 className="text-3xl mb-8">Cadastrar</h1>
			<CustomTextField label="Nome" variant="outlined" name="nome" required />
			<CustomTextField
				label="Email"
				variant="outlined"
				name="email"
				onBlur={handleBlur}
				required
				type="email"
			/>
			<CustomTextField
				label="Senha"
				variant="outlined"
				name="senha"
				required
				type="password"
			/>
			<CustomTextField
				variant="outlined"
				name="image"
				type="file"
				onChange={(e) => {
					const target = e.target as HTMLInputElement;
					if (target.files && target.files[0]) {
						setFile(target.files[0]);
					}
				}}
				required
			/>
			<CustomTextField
				label="Confirmar senha"
				variant="outlined"
				name="confirmarSenha"
				type="password"
				required
			/>
			<Button variant="contained" type="submit" className="mt-4">
				Cadastrar
			</Button>

			<Toaster richColors />
		</form>
	);
}
