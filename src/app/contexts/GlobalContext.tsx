"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { handleGetSession } from "../controllers/UserController";

interface Session {
	userId: number;
}

interface GlobalContextProps {
	session: boolean | null;
	setSession: React.Dispatch<React.SetStateAction<boolean | null>>;
	currentUserId: number | undefined;
	setCurrentUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [session, setSession] = useState<boolean | null>(null);
	const [currentUserId, setCurrentUserId] = useState<number | undefined>(1);

	useEffect(() => {
		async function fetchSession() {
			const sessionData = await handleGetSession();
			setSession(sessionData);
			setCurrentUserId(sessionData?.userId);
		}

		fetchSession();
	}, []);

	return (
		<GlobalContext.Provider
			value={{ session, setSession, currentUserId, setCurrentUserId }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (context === undefined) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}
	return context;
};
