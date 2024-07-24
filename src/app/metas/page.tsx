"use client";

import { useRouter } from "next/navigation";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect } from "react";
import React from "react";

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

	return <div className="bg-fundobackground h-screen">Metas</div>;
}
