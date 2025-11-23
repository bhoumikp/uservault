import axios from "axios";
import { NextResponse } from "next/server"

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const proxy = async (req) => {
	const pathname = req.nextUrl.pathname;
	const token = req.cookies.get("token")?.value;
	const loginUrl = new URL('/login', req.url);
	const vaultUrl = new URL('/vault', req.url);

	if (!token && pathname === '/vault') return NextResponse.redirect(loginUrl);

	try {
		const res = await axios.get(`${API_ENDPOINT}/auth/verify`, {
			headers: {
				cookie: `token=${token}`
			},
			withCredentials: true
		});
		const isLoggedIn = res.data.isLoggedIn;

		if (pathname === '/vault') {
			console.log(isLoggedIn);
			if (!token)
				return NextResponse.redirect(loginUrl);
			return NextResponse.next();
		}

		if (pathname === '/login' || pathname === '/signup') {
			if (token)
				return NextResponse.redirect(vaultUrl);
			return NextResponse.next();
		}
	} catch (err) {
		console.log(err.response?.data.message);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/vault',
		'/login',
		'/signup'
	]
}