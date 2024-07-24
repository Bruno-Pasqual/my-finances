// sessionContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { handleGetSession } from "@/app/utils/test";

interface SessionContextProps {
	session: any;
	setSession: React.Dispatch<React.SetStateAction<any>>;
}

const SessionContext = createContext<SessionContextProps | undefined>(
	undefined
);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [session, setSession] = useState<any>(null);

	useEffect(() => {
		async function fetchSession() {
			const sessionData = await handleGetSession();
			setSession(sessionData);
		}

		fetchSession();
	}, []);

	return (
		<SessionContext.Provider value={{ session, setSession }}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
};
