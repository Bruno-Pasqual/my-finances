"use client";

import { useState } from "react";

export default function Home() {
	const [file, setFile] = useState<File | undefined>(undefined);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!file) return;

		try {
			const data = new FormData();
			data.append("file", file);

			const res = await fetch("/api/upload", {
				method: "POST",
				body: data,
			});

			if (!res.ok) {
				const errorText = await res.text();
				throw new Error(errorText);
			}

			console.log("Upload bem-sucedido");
		} catch (e: any) {
			console.error("Erro no upload:", e.message);
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
