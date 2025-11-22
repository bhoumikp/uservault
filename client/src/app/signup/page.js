import AuthForm from "@/components/form/AuthForm";
import Navbar from "@/components/navbar/Navbar";

export default function Signup() {
	return (
		<div>
			<Navbar />
			<AuthForm isLogin={false} />
		</div>
	)
}