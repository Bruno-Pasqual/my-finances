import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink(props: NavlinkType) {
	const pathname = usePathname();

	return (
		<Link
			href={props.navigateTo}
			className={` ${pathname.includes(props.navigateTo) ? "active" : ""} navlink`}
		>
			{props.icon}
			<p className="nav-label">{props.label}</p>
		</Link>
	);
}
