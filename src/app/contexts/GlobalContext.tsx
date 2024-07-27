"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { handleGetSession } from "../controllers/authController";

interface GlobalContextProps {
	session: any | null;
	setSession: React.Dispatch<React.SetStateAction<any | null>>;
	currentUserId: number | undefined;
	setCurrentUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [session, setSession] = useState<any | null>(null);
	const [currentUserId, setCurrentUserId] = useState<number | undefined>(
		undefined
	);

	useEffect(() => {
		async function fetchSession() {
			const sessionData = await handleGetSession();
			if (session == null) {
				setSession(sessionData);
				setCurrentUserId(sessionData ? sessionData?.userId : null);
			}
		}

		fetchSession();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				session,
				setSession,
				currentUserId,
				setCurrentUserId,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (context === undefined) {
		throw new Error("O contexto deve ser usado com um Provider");
	}
	return context;
};
