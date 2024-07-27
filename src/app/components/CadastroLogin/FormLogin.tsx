"use client";

import { getUserId, handleLogin } from "@/app/controllers/UserController";
import { Button } from "@mui/material";
import { useToast } from "@/hooks/useToast";
import { ToastType } from "@/enums/enums";
import { useGlobalContext } from "@/app/contexts/GlobalContext";
import { CustomTextField } from "../shared/CustomTextField";
import { handleGetSession } from "@/app/controllers/authController";

export default function FormLogin() {
	const { showToast } = useToast();
	const { setSession, setCurrentUserId } = useGlobalContext();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const result = await handleLogin(data);
		const session = await handleGetSession();

		if (result) {
			const currentUserId: number | null = await getUserId(
				data.get("email") as string
			);

			if (currentUserId) {
				const session = await handleGetSession();
				setCurrentUserId(currentUserId);
				setSession(session);
			} else {
				showToast(ToastType.ERROR, "Alguma coisa deu errado");
			}
		}
		if (!result) showToast(ToastType.ERROR, "Email ou senha não conferem");
	};

	return (
		<form
			className="text-white flex flex-col gap-y-4"
			onSubmit={handleSubmit}
			method="POST"
		>
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
			<Button
				type="submit"
				variant="contained"
				className="mt-4 text-white font-semibold space-x-3 tracking-widest"
			>
				Entrar
			</Button>
		</form>
	);
}
