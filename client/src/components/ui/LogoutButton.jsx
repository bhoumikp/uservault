import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const LogoutButton = () => {
	const {setIsLoggedIn} = useAuth();
	const router = useRouter();

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${API_ENDPOINT}/auth/logout`, {}, {
				withCredentials: true
			});
			setIsLoggedIn(false);
			router.push('/');
		} catch(err) {
			console.log(err);
		}
	}

	return (
		<button onClick={handleLogout} className="nav-link">
			Logout ➜]
		</button>
	)
}