"use server";

import {
	FinalizarSessao,
	getSession,
	login as loginService,
} from "../utils/auth";
import { createUser, getCurrentUserId, isEmailAvaliable } from "../Dao/UserDao";
import { isEqual } from "../utils/utils";
import { useGlobalContext } from "../contexts/GlobalContext";
import { InformacoesCadastro, OperationResponse } from "../types/types";

export async function handleLogin(data: FormData) {
	try {
		const response = await loginService(data);
		return response;
	} catch (error) {
		return { success: false, msg: "Algo deu errado" };
	}
}

export async function handleCadastro(
	formData: FormData,
	imageCadastro: string | null
): Promise<OperationResponse> {
	const dadosCadastro = extractUserInfo(formData);

	try {
		if (!isEqual(dadosCadastro.senha[0], dadosCadastro.senha[1])) {
			return { success: false, msg: "As senhas não conferem" };
		} else {
			createUser(dadosCadastro, imageCadastro);
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

export async function handleLogout() {
	const response = await FinalizarSessao();
}

export async function getUserId(email: string) {
	const response = await getCurrentUserId(email);
	return response;
}
