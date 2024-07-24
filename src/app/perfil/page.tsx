"use client";

import React, { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useRouter } from "next/navigation";

export default function Page() {
	const { session } = useGlobalContext();
	const router = useRouter(); // Obtendo o router

	const [loading, setLoading] = React.useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		if (!session) {
			router.push("/");
		}
	}, [session]);

	return <div className="bg-fundobackground h-screen">Page</div>;
}
