"use client";

import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import CadastroLogin from "./components/CadastroLogin/CadastroLogin";
import { useGlobalContext } from "./contexts/GlobalContext";
import { useRouter } from "next/navigation";

export default function Home() {
	const { session } = useGlobalContext();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push("/inicio");
		}
	}, [session, router]);

	return (
		<main className="bg-fundobackground min-h-screen py-20 w-screen max-w-[400px]">
			{!session ? <CadastroLogin /> : "Redirecionando..."}
			<div></div>
		</main>
	);
}
