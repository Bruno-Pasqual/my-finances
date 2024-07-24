"use client";

import { useSession } from "@/app/contexts/sessionContext";
import { handleGetSession, handleLogin } from "@/app/utils/test";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom styled TextField
const CustomTextField = styled(TextField)({
	"& label": {
		color: "#b3b3b3", // Cor clara para o texto do rótulo
	},
	"& label.Mui-focused": {
		color: "#ffffff", // Cor do rótulo quando o campo está focado
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "#b3b3b3", // Cor clara para a borda
		},
		"&:hover fieldset": {
			borderColor: "#ffffff", // Cor da borda ao passar o mouse
		},
		"&.Mui-focused fieldset": {
			borderColor: "#ffffff", // Cor da borda quando o campo está focado
		},
		color: "#ffffff", // Cor clara para o texto
	},
});

export default function FormLogin() {
	const { setSession } = useSession();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const dadosLogin: InformacoesLogin = {
			email: data.get("email") as string,
			senha: data.get("senha") as string,
		};

		const result = await handleLogin(dadosLogin);
		console.log(result);
		if (result.success) setSession(true);
	};

	return (
		<form className="text-white flex flex-col gap-y-4" onSubmit={handleSubmit}>
			<h1 className="text-3xl mb-8">Entrar na sua conta</h1>
			<CustomTextField
				id="outlined-email"
				label="Email"
				variant="outlined"
				name="email"
				type="email"
				required
			/>
			<CustomTextField
				id="outlined-senha"
				label="Senha"
				variant="outlined"
				name="senha"
				type="password"
				required
			/>
			<Button type="submit" variant="contained" className="mt-4">
				Entrar
			</Button>
		</form>
	);
}