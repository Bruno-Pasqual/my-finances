"use client";

import "./Navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FlagIcon from "@mui/icons-material/Flag";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import NavLink from "./NavLink";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { ToastType } from "@/enums/enums";
import router from "next/router";
import { handleLogout } from "@/app/controllers/UserController";
import { useGlobalContext } from "@/app/contexts/GlobalContext";

type NavlinkType = {
	label: string;
	icon: React.ReactElement;
	navigateTo: string;
};

const linksPage: NavlinkType[] = [
	{
		label: "Início",
		icon: <HomeIcon />,
		navigateTo: "/inicio",
	},
	{
		label: "Transações",
		icon: <CurrencyExchangeIcon />,
		navigateTo: "/transacoes",
	},

	{
		label: "Perfil",
		icon: <PersonIcon />,
		navigateTo: "/perfil",
	},
];

export default function Navbar() {
	const { session, setSession, setCurrentUserId } = useGlobalContext();
	const { showToast } = useToast();

	useEffect(() => {
		if (session) showToast(ToastType.SUCCESS, "Bem vindo de volta");
	}, [session]);

	async function handleSaida(): Promise<void> {
		setCurrentUserId(undefined);
		const response = await handleLogout();
		setSession(null);
	}

	return (
		<nav
			className={` bg-fundoMenu navbar z-10 ${session == null ? "hidden" : ""}`}
		>
			<ul className="links-list">
				{linksPage.map((info, index) => (
					<li key={index}>
						<NavLink {...info} />
					</li>
				))}
				<li className=" hidden md:flex bottom-60 w-screen " onClick={handleSaida}>
					<NavLink label="sair" icon={<LogoutIcon />} navigateTo="/" />
				</li>
			</ul>
		</nav>
	);
}
