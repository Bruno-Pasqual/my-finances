import { handleCadastro, handleEmailAvaliable } from "@/app/utils/test";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { toast, Toaster } from "sonner";
import { isValidEmailFormat } from "@/app/utils/utils";
import { useToast } from "@/hooks/useToast";
import { ToastType } from "@/enums/enums";
// Custom styled TextField

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

interface FormCadastroProps {
	setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function FormCadastro(props: FormCadastroProps) {
	const { showToast } = useToast();

	//#region Methods

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
		setValue: React.Dispatch<React.SetStateAction<number>>
	) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email") as string;
		const isEmailAvaliable: boolean = await handleEmailAvaliable(email);

		if (!isEmailAvaliable) {
			toast.error("O email já está em uso");
			return;
		}

		let response: OperationResponse | null = await handleCadastro(data);
		console.log(response);

		if (response.success) {
			showToast(ToastType.SUCCESS, response.msg);
			setValue(0);
		} else {
			showToast(ToastType.ERROR, response.msg);
		}
	};

	const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
		console.log("entrei aqui");

		const email: string = event.target.value;
		if (!isValidEmailFormat(email)) return;
		const isEmailAvaliable: boolean = await handleEmailAvaliable(email);

		if (!isEmailAvaliable) showToast(ToastType.ERROR, "O email já está em uso");
	};

	//#endregion

	return (
		<form
			className="text-white text-lg flex flex-col gap-y-4"
			onSubmit={(e) => {
				handleSubmit(e, props.setValue);
			}}
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
