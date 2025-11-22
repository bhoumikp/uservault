// import { getToken } from "@/utils/get-token";
import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const checkAuth = async () => {
	try {
		const res = await axios.get(`${API_ENDPOINT}/auth/verify`, {
			withCredentials: true
		});

		if (!res?.isLoggedIn) {
			return router.push('/login')
		} else {
			return router.push('/vault');
		}
	} catch (err) {
		console.log(err.response.data);
	}
}

// const verifyLogin = async () => {
// 	const res = await checkAuth();
// 	if (!res?.isLoggedIn) {
// 		return router.push('/login')
// 	} else {
// 		return router.push('/vault');
// 	}
// }