"use client";

import { useState } from "react";

export default function Home() {
	const [file, setFile] = useState<File | undefined>(undefined);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault(); // Corrigido para chamar a função

		if (!file) return; // Verifica se o arquivo está definido

		try {
			const data = new FormData();
			data.append("file", file); // Usando append em vez de set

			const res = await fetch("/api/upload", {
				method: "POST",
				body: data,
			});

			if (!res.ok) {
				const errorText = await res.text(); // Corrigido para chamar o método
				throw new Error(errorText);
			}

			// Aqui você pode adicionar lógica para lidar com a resposta, se necessário
			console.log("Upload bem-sucedido");
		} catch (e: any) {
			console.error("Erro no upload:", e.message); // Mensagem de erro mais informativa
		}
	}

	return (
		<main>
			<form onSubmit={onSubmit}>
				<input
					type="file"
					name="file"
					onChange={(e) => {
						if (e.target.files) {
							setFile(e.target.files[0]);
						}
					}}
				/>
				<input type="submit" value="Upload" />
			</form>
		</main>
	);
}
