'use client'

import Link from "next/link";
import Navlink from "./Navlink";
import { LogoutButton } from "../ui/LogoutButton";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

export default function Navbar() {
	const {isLoggedIn} = useContext(AuthContext);
	const navLinks = [
		{name: 'Home', path: '/'},
		{name: 'Login', path: '/login'},
		{name: 'Sign Up', path: '/signup'}
	]	

	return (
		<nav className="navbar navbar-expand-lg p-3 py-md-3 px-md-5 ">
			<div className="container-fluid h-25">
				
				{/* Brand Logo */}
				<Link className="navbar-brand fw-bold fs-3" href="/"><span style={{color: "black"}}>User</span>Vault</Link>

				{/* Toggler */}
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target='#nav-container' >
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Nav items */}
				<div className="collapse navbar-collapse" id="nav-container">
					<ul className="navbar-nav ms-md-auto gap-2 gap-lg-5 fs-5 fw-semibold text-center">
						{(!isLoggedIn) 
							? 
								navLinks.map((navLink, index) => {
									return <Navlink navData={navLink} key={index}/>;
								}) 
							: <>
								<Navlink navData={{name: "Home", path: "/"}}/>
								<LogoutButton />
							</>
						}
					</ul>
				</div>
			</div>
		</nav>
	)
}