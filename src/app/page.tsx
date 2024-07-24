"use client";

import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import CadastroLogin from "./components/CadastroLogin/CadastroLogin";
import { useSession } from "./contexts/sessionContext";
import { useRouter } from "next/navigation";

export default function Home() {
	const { session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push("/inicio");
		}
	}, [session, router]);

	return (
		<main className="bg-fundobackground min-h-screen py-20">
			{!session ? (
				<Paper className="bg-fundojanelas max-w-[500px] w-11/12 mx-auto pb-8 md:px-6">
					<CadastroLogin />
				</Paper>
			) : (
				"Redirecionando..."
			)}
		</main>
	);
}
