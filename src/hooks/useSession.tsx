// useSession.tsx
import { getSession } from "@/app/utils/auth";
import { useEffect, useState } from "react";

export function useSession() {
	const [session, setSession] = useState(null);

	useEffect(() => {
		async function fetchSession() {
			const sessionData = await getSession();
			setSession(sessionData);
		}
		fetchSession();
	}, []);

	return session;
}
