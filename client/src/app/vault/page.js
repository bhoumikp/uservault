'use client'

import Navbar from "@/components/navbar/Navbar";
import ProfileCard from "@/components/profile/ProfileCard";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthContext } from "@/context/authContext";
import { checkAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function Vault() {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<div>
			<Navbar />
			<ProfileCard />
		</div>
	)
}