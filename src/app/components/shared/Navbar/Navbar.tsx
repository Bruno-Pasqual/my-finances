"use client";

import "./Navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FlagIcon from "@mui/icons-material/Flag";
import PersonIcon from "@mui/icons-material/Person";
import NavLink from "./NavLink";
import { useSession } from "@/app/contexts/sessionContext";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { ToastType } from "@/enums/enums";

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
		label: "Metas",
		icon: <FlagIcon />,
		navigateTo: "/metas",
	},
	{
		label: "Perfil",
		icon: <PersonIcon />,
		navigateTo: "/perfil",
	},
];

export default function Navbar() {
	const { session } = useSession();
	const { showToast } = useToast();

	useEffect(() => {
		if (session) showToast(ToastType.SUCCESS, "Bem vindo de volta");
	}, [session]);

	return (
		<nav className={`navbar ${session == null ? "hidden" : ""}`}>
			<ul className="links-list">
				{linksPage.map((info, index) => (
					<li key={index}>
						<NavLink {...info} />
					</li>
				))}
			</ul>
		</nav>
	);
}
