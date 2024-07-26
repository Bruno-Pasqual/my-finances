import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { validUser } from "../Dao/UserDao";
import { InformacoesLogin } from "../types/types";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

const TOKEN_EXPIRATION_MINUTES = 10;
const SESSION_EXPIRATION_MS = TOKEN_EXPIRATION_MINUTES * 60 * 1000;

export async function encrypt(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(`${TOKEN_EXPIRATION_MINUTES}m`)
		.sign(key);
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export async function login(formData: FormData) {
	const user: InformacoesLogin = {
		email: formData.get("email") as string,
		senha: formData.get("senha") as string,
	};

	const isValidUser = await validUser(user.email, user.senha);

	if (isValidUser) {
		const expires = new Date(Date.now() + SESSION_EXPIRATION_MS);
		const session = await encrypt({ userEmail: user.email, expires });
		cookies().set("session", session, { expires, httpOnly: true });
		return session;
	} else {
		return null;
	}
}

export async function logout() {
	cookies().set("session", "", { expires: new Date(0) });
	return true;
}

export async function getSession() {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get("session")?.value;
	if (!session) return;

	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + SESSION_EXPIRATION_MS);
	const res = NextResponse.next();
	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
	return res;
}
