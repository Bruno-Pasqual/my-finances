"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { handleGetSession } from "../controllers/UserController";

// Definindo a interface para a sessão
interface Session {
	// Adicione os campos relevantes para sua sessão aqui
	userId: number;
	// Exemplo: email: string;
}

// Definindo a interface para as propriedades do contexto global
interface GlobalContextProps {
	session: boolean | null;
	setSession: React.Dispatch<React.SetStateAction<boolean | null>>;
	currentUserId: number | undefined;
	setCurrentUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

// Criando o contexto global
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Provedor Global
export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [session, setSession] = useState<boolean | null>(null);
	const [currentUserId, setCurrentUserId] = useState<number | undefined>(1);

	useEffect(() => {
		async function fetchSession() {
			const sessionData = await handleGetSession();
			setSession(sessionData);
			setCurrentUserId(sessionData?.userId); // Ajuste para definir o currentUserId
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

// Hook para usar o contexto global
export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (context === undefined) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}
	return context;
};
