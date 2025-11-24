import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;


const fetchUser = async () => {
	try {
		const res = await axios.get(`${API_ENDPOINT}/user`, {
			withCredentials: true
		});
		return res.data.user;
	} catch (err) {
		console.log(err);
	}
}


const updateUser = async (e, payload) => {
	e.preventDefault();

	try {
		const res = await axios.put(`${API_ENDPOINT}/user`, payload, {
			withCredentials: true
		});
		alert(res.data.message);
	} catch (err) {
		console.log(err);
		alert(err.response?.data.message);
	}
}


export const verifyLogin = async () => {
	try {
		const res = await axios.get(`${API_ENDPOINT}/auth/verify`, {
			withCredentials: true
		});
		return res.data.isLoggedIn;
	} catch (err) {
		console.log(err.response?.data);
		return false;
	}
}

export {
	fetchUser,
	updateUser
}

