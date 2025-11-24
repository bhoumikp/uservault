'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { verifyLogin } from "@/services/user-service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(null);

	useEffect(() => {
		verifyLogin()
			.then((data) => {
				setIsLoggedIn(data);
			})
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);