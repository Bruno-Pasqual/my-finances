import { NextRequest } from "next/server";
import { updateSession } from "./auth";
import { useSession } from "../contexts/GlobalContext";

export async function middleware(request: NextRequest) {
	return await updateSession(request);
}
