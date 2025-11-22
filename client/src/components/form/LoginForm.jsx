'use client'

import { useState } from "react"
import axios from 'axios';
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

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
			setIsLoggedIn(true);
			router.push('/vault');
		} catch(err) {
			console.log(err);
			alert(err.response?.data.message);
		}
	}


	return (
		<div className="container-fluid d-flex flex-column align-items-center">
			<div className="mt-5 text-center">
				<h1 className="fw-bold display-5">
					Open Your <span style={{color: 'rgb(238, 76, 12)'}}>Vault.</span> 
				</h1>
				<p className="text-muted fs-5 mt-3">
					Unlock your secure vault. Store your identity safely.
				</p>
			</div>

			<form className="w-25 mt-4">
				<div className='m-4'>
					<label className="form-label fw-semibold my-2">Username</label>
					<input 
						onChange={ (e) => setUsername(e.target.value) }
						className="form-control" 
						type="text" name="username" 
						placeholder="Enter username" 
						required 
						autoComplete="off"
					/>
				</div>

				<div className="m-4 ">
					<label className="form-label fw-semibold">Password</label>
					<input 
						onChange={ (e) => setPassword(e.target.value) }
						className="form-control" 
						type="password" 
						name="password" 
						placeholder="Enter password" 
						required 
						autoComplete="off"
					/>
				</div>

				<div className='m-4'>
					<button onClick={handleLogin} type="submit" className="btn btn-custom-primary w-100 fw-semibold fs-5 py-3 my-1">Login</button>
				</div>
			</form>
		</div>
	)
}