import { PrismaClient } from "@prisma/client";
import { log } from "console";
const prisma = new PrismaClient();

export async function createUser(infoCadastro: InformacoesCadastro) {
	console.log("UserDao");

	await prisma.user.create({
		data: {
			nome: infoCadastro.nome,
			email: infoCadastro.email,
			senha: infoCadastro.senha[0],
		},
	});

	console.log(await getAllUsers());
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

export async function validUser(
	email: string,
	senha: string
): Promise<boolean> {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
			senha: senha,
		},
	});

	return user ? true : false;
}
