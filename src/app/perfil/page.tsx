"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useRouter } from "next/navigation";
import { getFromLocalStorage } from "../utils/utils";
import { User } from "../types/types";
import Image from "next/image";

export default function Page() {
	const { session } = useGlobalContext();
	const router = useRouter(); // Obtendo o router

	const [loading, setLoading] = React.useState<boolean>(true);
	const [user, setUserById] = React.useState<User>();
	console.log(getFromLocalStorage("currentUserId"));

	useEffect(() => {
		if (!session) {
			router.push("/");
		} else {
			setLoading(false);
		}
	}, [session, router]);

	// Renderizar um carregamento ou algo semelhante enquanto verifica a sessão
	if (loading) {
		return <div className="bg-fundobackground h-screen w-screen">Loading...</div>;
	}

	return <div className="bg-fundobackground h-screen w-screen"></div>;
}
