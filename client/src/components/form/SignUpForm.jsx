'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function SignUpForm() {
	const router = useRouter();
	const [username, setUsername] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [dob, setDob] = useState(null);
	const [gender, setGender] = useState(null);
	const [maritalStatus, setMaritalStatus] = useState(null);

	const comparePasswords = () => {
		if(password===confirmPassword)
			return true
		return false;
	}

	const handleSignUp = async (e) => {
		e.preventDefault();

		if(!comparePasswords())
			return alert("Passwords does not match.");

		try {
			const payload = { username, email, password, dob, gender, maritalStatus }
			const res = await axios.post(`${API_ENDPOINT}/user`, payload);
			alert(res.data.message);
			console.log(res);
			router.push('/login');
		} catch(err) {
			console.log(err);
			alert(err.response?.data.message);
		}
	}

	return (
		<div className="container-fluid d-flex flex-column align-items-center p-4 col-lg-8 mb-5">
			<div className="my-3 text-center">
				<h1 className="fw-bold display-5">
					
					Create Your <span style={{color: 'rgb(238, 76, 12)'}}>Vault.</span> 
				</h1>
				<p className="text-muted fs-5 mt-3">
					Build your secure vault, protected by encryption. Your identity stays safe here.
				</p>
			</div>


			<form className="auth-form p-lg-4 col-md-10 mt-2 mt-lg-4">
				<div className="row m-4 mx-3">
					<div className='col-12 col-lg-6'>
						<Input 
							label="Username" 
							type="text" 
							placeholder="Enter username"
							listener={setUsername}
						/>
					</div>
				{/* </div> */}

				{/* <div className="row m-4"> */}
					<div className="col-12 col-lg-6 mt-3 mt-lg-0">
						<Input 
							label="Email" 
							type="email" 
							placeholder="Enter email"
							listener={setEmail}
						/>
					</div>
				{/* </div> */}

				{/* <div className='row m-4'> */}
					<div className="col-12 col-lg-6 mt-3 mt-lg-4">
						<Input 
							label="Password" 
							type="password" 
							placeholder="Enter password"
							listener={setPassword}
						/>
					</div>

					<div className="col-12 col-lg-6 mt-3 mt-lg-4">
						<Input 
							label="Confirm Password" 
							type="password" 
							placeholder="Re-Enter password"
							listener={setConfirmPassword}
						/>
					</div>
				{/* </div> */}

				{/* <div className='row m-4'> */}
					<div className="col-12 col-lg-4 mt-3 mt-lg-4">
						<Input 
							label={"Date of Birth"}
							type={"date"}
							listener={setDob}
						/>
					</div>
					<div className="col-12 col-lg-4 mt-2 mt-lg-4">
						<Select 
							label={"Gender"}
							listener={setGender}
							options={["Male", "Female"]}
						/>
					</div>
					<div className="col-12 col-lg-4 mt-2 mt-lg-4">
						<Select 
							label={"Marital Status"}
							listener={setMaritalStatus}
							options={["Single", "Married", "Divorced", "Widowed", "Seperated"]}
						/>
					</div>
				</div>

				<div className='row m-4 px-2'>
					<button 
						type="submit" 
						onClick={handleSignUp} 
						className="btn btn-custom-primary btn-auth-submit fw-semibold fs-5 my-3"
						>
							Sign Up
					</button>
				</div>
			</form>
		</div>
	)
}