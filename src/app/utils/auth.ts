import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { validUser } from "../Dao/UserDao";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("10 minutes from now")
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
		const expires = new Date(Date.now() + 3600 * 1000);
		const session = await encrypt({ user, expires });
		cookies().set("session", session, { expires, httpOnly: true });
		return session;
	} else {
		null;
	}
}

export async function FinalizarSessao() {
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

	// Refresh the session so it doesn't expire
	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + 10 * 1000);
	const res = NextResponse.next();
	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
	return res;
}
