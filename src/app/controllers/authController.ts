"use server";

import { getSession } from "../utils/auth";

export async function handleGetSession() {
	return await getSession();
}
