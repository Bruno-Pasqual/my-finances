"use server";

import { getSession, login as loginService } from "@/app/utils/auth";
import { createUser, isEmailAvaliable } from "../Dao/UserDao";
import { isEqual } from "./utils";

export async function handleLogin(dadosLogin: InformacoesLogin) {
	try {
		const response: LoginResponse = await loginService(dadosLogin);
		return response;
	} catch (error) {
		return { success: false, msg: "Email ou senha não conferem" };
	}
}

export async function handleCadastro(
	formData: FormData
): Promise<OperationResponse> {
	const dadosCadastro = extractUserInfo(formData);

	try {
		if (!isEqual(dadosCadastro.senha[0], dadosCadastro.senha[1])) {
			return { success: false, msg: "As senhas não conferem" };
		} else {
			createUser(dadosCadastro);
			return { success: true, msg: "Usuário criado com sucesso !" };
		}
	} catch (error) {
		console.log(error);
		return { success: false, msg: "Alguma coisa deu errado" };
	}
}

export async function handleEmailAvaliable(email: string): Promise<boolean> {
	const response: boolean = await isEmailAvaliable(email);
	return response;
}

function extractUserInfo(data: FormData) {
	const dadosCadastro: InformacoesCadastro = {
		nome: data.get("nome") as string,
		email: data.get("email") as string,
		senha: [data.get("senha") as string, data.get("confirmarSenha") as string],
	};

	return dadosCadastro;
}

export async function handleGetSession(): Promise<any> {
	const session = await getSession();
	return session;
}
