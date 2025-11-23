'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"

export default function Navlink({navData}) {
	const pathname = usePathname();
	return (pathname !== navData.path) && (
	<li className="nav-item">
		<Link className="nav-link" href={navData.path}>{navData.name}</Link>
	</li>)
	
}