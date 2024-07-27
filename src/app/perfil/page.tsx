"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useRouter } from "next/navigation";
import Spinner from "../components/shared/Spinner";
import Image from "next/image";
import { CustomTextField } from "../components/shared/CustomTextField";
import { Button, Paper } from "@mui/material";
import { User } from "../types/types";
import {
	handleGetUserByEmail,
	handleUpdateUser,
} from "../controllers/UserController";
import { useToast } from "@/hooks/useToast";
import { ToastType } from "@/enums/enums";
import { getSession } from "../utils/auth";

export default function Page() {
	const { session } = useGlobalContext();
	const router = useRouter();
	const [loading, setLoading] = React.useState<boolean>(true);
	const [currentUser, setCurrentUser] = React.useState<User | null>();
	const [file, setFile] = useState<File | null>(null);
	const { showToast } = useToast();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		let imagePath: string | null = "";

		if (file) {
			formData.append("image", file);
			try {
				const res = await fetch("/api/upload", {
					method: "POST",
					body: formData,
				});

				if (!res.ok) {
					const errorText = await res.text();
					throw new Error(errorText);
				}

				const responseData = await res.json();

				if (responseData.success) {
					imagePath = responseData.filePath;
					showToast(
						ToastType.SUCCESS,
						`imagem armazenada em: ${responseData.filePath}`
					);
				} else {
					console.error("Upload falhou:", responseData.message);
				}
			} catch (error) {
				console.error("Erro no upload:");
			}
		}

		let response: User | null = await handleUpdateUser(
			currentUser!.id,
			formData,
			imagePath!
		);

		if (response) {
			showToast(ToastType.SUCCESS, "Os dados foram atualizados com sucesso");
			setCurrentUser(response);
		} else {
			showToast(ToastType.ERROR, "Alguma coisa deu errado ao atualizar os dados");
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			if (!session) {
				router.push("/");
			} else {
				try {
					const response = await handleGetUserByEmail(session.userEmail);

					setCurrentUser(response);
				} catch (error) {
					console.error("Error fetching user data:", error);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchUserData();
	}, [session]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<div className=" w-screen min-h-screen  bg-fundobackground">
					<div className="container   mx-auto w-max-[1000px] lg:flex lg:gap-x-4 pt-20  ">
						<Paper className="mb-10 p-8 bg-none border-black max-w-[400px] mx-auto">
							{currentUser?.image && (
								<Image
									src={currentUser.image} // Certifique-se de que a extensão do arquivo está correta
									width={400}
									height={300}
									alt="Enxoval para Gato"
								/>
							)}
							<div className="flex gap-x-4 mt-4 text-white">
								<label className="w-14">Nome: </label>
								<p className="opacity-50">{currentUser?.nome}</p>
							</div>
							<div className="flex gap-x-4 text-white">
								<label className="w-14">Email: </label>
								<p className="opacity-50">{currentUser?.email}</p>
							</div>
						</Paper>
						<Paper className="p-6 mb-10 grow max-w-[400px]  lg:max-w-screen-lg mx-auto">
							<h1 className="mb-6 text-primary ">Atualizar dados cadastrais</h1>
							<form className="flex  flex-col mt-6 gap-y-4" onSubmit={handleSubmit}>
								<CustomTextField label={"Nome"} type="text" name="nome" />
								<CustomTextField label={"Senha"} type="password" name="senha" />
								<CustomTextField
									variant="outlined"
									name="image"
									type="file"
									label={"Imagem"}
									onChange={(e) => {
										const target = e.target as HTMLInputElement;
										if (target.files && target.files[0]) {
											setFile(target.files[0]);
										}
									}}
								/>
								<Button
									variant="contained"
									type="submit"
									className=" text-white font-semibold space-x-3 tracking-widest"
								>
									Atualizar
								</Button>
							</form>
						</Paper>
					</div>
				</div>
			)}
		</>
	);
}
