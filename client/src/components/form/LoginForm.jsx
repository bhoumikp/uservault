'use client'

import { useState } from "react"
import axios from 'axios';
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { Input } from "../ui/Input";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function LoginForm() {
	const {setIsLoggedIn} = useAuth();
	const router = useRouter();
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			if(!username || !password)
				return alert("Please enter username and password.")

			const payload = { username, password }
			const res = await axios.post(`${API_ENDPOINT}/auth/token`, payload, {
				withCredentials: true
			});
			console.log(res);
			setIsLoggedIn(true);
			router.push('/vault');
		} catch(err) {
			console.log(err);
			alert(err.response?.data.message);
		}
	}


	return (
		<div className="container-fluid d-flex flex-column align-items-center col-sm-10 p-4 col-lg-5">
			<div className="text-center mt-3 mt-md-5">
				<h1 className="fw-bold display-5">
					Open Your <span style={{color: 'rgb(238, 76, 12)'}}>Vault.</span> 
				</h1>
				<p className="text-muted fs-5 mt-3">
					Unlock your secure vault. Store your identity safely.
				</p>
			</div>

			<form className="auth-form p-lg-4 col-12 col-lg-8 mt-4">
				<div className='m-4'>
					<Input 
						label="Username" 
						type="text" 
						placeholder="Enter username"
						listener={setUsername}
					/>
				</div>

				<div className="m-4 ">
					<Input 
						label="Password" 
						type="password" 
						placeholder="Enter password"
						listener={setPassword}
					/>
				</div>

				<div className='m-4'>
					<button 
						onClick={handleLogin} 
						type="submit" 
						className="btn btn-custom-primary btn-auth-submit w-100 fw-semibold fs-5 mt-2 mt-md-4"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	)
}