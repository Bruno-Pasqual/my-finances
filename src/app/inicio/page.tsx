"use client";

import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useRouter } from "next/navigation";
import React from "react";
import { CircularProgress } from "@mui/material";
import { updateSession } from "../utils/auth";

export default function Page() {
	const { session } = useGlobalContext();
	const router = useRouter(); // Obtendo o router

	const [loading, setLoading] = React.useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		if (!session) {
			router.push("/");
		}

		setLoading(false);
	}, [session, router]);

	return (
		<div className="bg-fundobackground h-screen">
			{loading ? (
				<CircularProgress size={200} className="fixed left-2/4 top-2/4" />
			) : (
				""
			)}
		</div>
	);
}
