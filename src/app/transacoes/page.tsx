"use client";

import { useRouter } from "next/navigation";
import { useSession } from "../contexts/sessionContext";
import React, { useEffect } from "react";

export default function Page() {
	const { session } = useSession();
	const router = useRouter(); // Obtendo o router

	const [loading, setLoading] = React.useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		if (!session) {
			router.push("/");
		}
	}, [session]);

	return <div className="bg-fundobackground h-screen">page</div>;
}
