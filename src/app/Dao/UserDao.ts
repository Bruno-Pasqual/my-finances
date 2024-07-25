import { PrismaClient } from "@prisma/client";
import { log } from "console";
import { InformacoesCadastro, User } from "../types/types";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { comparePasswords, getHash } from "../utils/Bcrypt";

const prisma = new PrismaClient();

export async function createUser(
	infoCadastro: InformacoesCadastro,
	imagePath: string | null
) {
	const hash = getHash(infoCadastro.senha[0]);

	await prisma.user.create({
		data: {
			nome: infoCadastro.nome,
			email: infoCadastro.email,
			senha: hash,
			image: imagePath,
		},
	});
}

export async function getAllUsers() {
	const allUsers: User[] = await prisma.user.findMany();
	return allUsers;
}

export async function isEmailAvaliable(email: string): Promise<boolean> {
	const user = await prisma.user.findUnique({
		where: { email: email },
	});

	return user === null;
}

export async function getCurrentUserId(email: string): Promise<number | null> {
	const user = await prisma.user.findUnique({
		where: { email: email },
	});

	if (user) {
		return user.id;
	} else {
		return null;
	}
}

export async function validUser(
	email: string,
	senha: string
): Promise<boolean> {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (!user) {
		return false;
	}

	// Comparar a senha fornecida com o hash armazenado
	const isPasswordValid = comparePasswords(senha, user.senha);
	console.log(user);

	return isPasswordValid;
}
