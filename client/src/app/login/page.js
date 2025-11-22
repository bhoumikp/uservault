import Navbar from "@/components/navbar/Navbar";
import AuthForm from "@/components/form/AuthForm";

export default async function Login() {

	return (
		<div>
			<Navbar />
			<AuthForm isLogin={true} />
		</div>
	)
}