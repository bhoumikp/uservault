'use client'

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(null);

	const verifyLogin = async () => {
		try {
			const res = await axios.get(`${API_ENDPOINT}/auth/verify`, {
				withCredentials: true
			});
			setIsLoggedIn(res.data.isLoggedIn);
			console.log(isLoggedIn);
		} catch (err) {
			setIsLoggedIn(false);
			console.log(err.response.data);
		}
	}

	useEffect(() => {
		verifyLogin();
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);