'use client'

import { checkAuth } from "@/lib/auth";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		const verifyLogin = async () => {
			const res = await checkAuth();
			if(!res?.isLoggedIn) {
				return router.push('/login')
			} else {
				return router.push('/vault');
			}
		}

		verifyLogin();

	}, [])

	return children;
}