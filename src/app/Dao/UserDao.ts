import { updateUserInfo } from "./../types/types";
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

export async function isEmailAvaliable(email: string): Promise<boolean> {
	const user = await prisma.user.findUnique({
		where: { email: email },
	});

	return user === null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: { email },
	});

	return user;
}

export async function updateUser(
	updateUserInfo: updateUserInfo
): Promise<User | null> {
	const { id, nome, image, senha } = updateUserInfo;

	console.log(id, nome, image, senha);

	const data: { nome?: string; image?: string; senha?: string } = {};
	if (nome) data.nome = nome;
	if (image) data.image = image;
	if (senha) data.senha = senha;

	console.log("Updating user with data:", data); // Adicione isto para depuração

	const user = await prisma.user.update({
		where: { id },
		data,
	});

	return user;
}

export async function getCurrentUserId(email: string): Promise<number | null> {
	const user = await prisma.user.findUnique({
		where: { email },
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

	const isPasswordValid = comparePasswords(senha, user.senha);

	return isPasswordValid;
}
