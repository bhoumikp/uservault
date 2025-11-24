import { NextResponse } from "next/server"

export const proxy = async (req) => {
	const pathname = req.nextUrl.pathname;
	const token = req.cookies.get("token")?.value;
	const loginUrl = new URL('/login', req.url);
	const vaultUrl = new URL('/vault', req.url);

	if (pathname === '/vault') {
		if (!token)
			return NextResponse.redirect(loginUrl);
		return NextResponse.next();
	}

	if (pathname === '/login' || pathname === '/signup') {
		if (token)
			return NextResponse.redirect(vaultUrl);
		return NextResponse.next();
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