import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { userExist } from "../Dao/UserDao";
import { useToast } from "@/hooks/useToast";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1h")
		.sign(key);
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export async function login(props: InformacoesLogin): Promise<LoginResponse> {
	let userValid = false;

	const user = { email: props.email, senha: props.senha };

	const isUserValid = await userExist(user.email, user.senha);
	if (isUserValid) userValid = true;

	if (userValid) {
		// Create the session
		const expires = new Date(Date.now() + 3600 * 1000);
		const session = await encrypt({ user, expires });

		// Save the session in a cookie
		cookies().set("session", session, { expires, httpOnly: true });
		return { success: true, msg: "Bem vindo de volta", session };
	} else {
		logout();
		return { success: false, msg: "Email ou senha incorretos", session: null };
	}
}

export async function logout() {
	// Destroy the session
	cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get("session")?.value;

	if (!session) {
		// Se não houver sessão, redirecione para a página inicial
		return NextResponse.redirect("/");
	}

	// Se a sessão existir, atualize-a para evitar expiração
	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + 3600 * 1000); // Atualizar a expiração da sessão para 1 hora no futuro

	const res = NextResponse.next();
	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});

	return res;
}
