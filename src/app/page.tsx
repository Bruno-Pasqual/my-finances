"use client";

import React, { useEffect } from "react";
import CadastroLogin from "./components/CadastroLogin/CadastroLogin";
import { useGlobalContext } from "./contexts/GlobalContext";
import { useRouter } from "next/navigation";
import { handleGetSession } from "./controllers/authController";
import Spinner from "./components/shared/Spinner";

export default function Home() {
	const { session, setSession } = useGlobalContext();
	const router = useRouter();

	useEffect(() => {
		const checkSession = async () => {
			const response = await handleGetSession();
			setSession(response);
			response && router.push("/inicio");
		};

		if (session) {
			router.push("/inicio");
		} else {
			checkSession();
		}
	}, [session]);

	return (
		<main className="bg-fundobackground min-h-screen py-20 w-screen max-w-[400px]">
			{!session ? <CadastroLogin /> : <Spinner />}
		</main>
	);
}
