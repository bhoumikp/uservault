'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
		<div className="container-fluid d-flex flex-column align-items-center w-50">
			<div className="mt-5 text-center">
				<h1 className="fw-bold display-5">
					Create Your <span style={{color: 'rgb(238, 76, 12)'}}>Vault.</span> 
				</h1>
				<p className="text-muted fs-5 mt-3">
					Build your secure vault, protected by encryption. Your identity stays safe here.
				</p>
			</div>


			<form className="w-75 mt-4">
				<div className="row m-4">
					<div className='col-12'>
						<label className="form-label fw-semibold my-2">Username</label>
						<input onChange={(e) => setUsername(e.target.value)} className="form-control" type="text" name="username" placeholder="Enter username" required/>
					</div>
				</div>

				<div className="row m-4">
					<div className="col-12">
						<label className="form-label fw-semibold my-2">Email</label>
						<input onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" name="email" placeholder="Enter email address" required/>
					</div>
				</div>

				<div className='row m-4'>
					<div className="col-6 ">
						<label className="form-label fw-semibold my-2">Password</label>
						<input onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" name="password" placeholder="Enter password" required />
					</div>

					<div className="col-6">
						<label className="form-label fw-semibold my-2">Confirm Password</label>
						<input onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" type="password" name="confirmPassword" placeholder="Re-Enter password" required/>
					</div>
				</div>

				<div className='row m-4'>
					<div className="col-4">
						<label className="form-label fw-semibold my-2">Date of Birth</label>
						<input onChange={(e) => setDob(e.target.value)} className="form-control" type="date" name="dob" />
					</div>
					<div className="col-4">
						<label className="form-label fw-semibold my-2">Gender</label>
						<select onChange={(e) => setGender(e.target.value)} className='form-select' name="gender">
							<option value="">Select Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
					<div className="col-4">
						<label className="form-label fw-semibold my-2">Marital Status</label>
						<select onChange={(e) => setMaritalStatus(e.target.value)} className='form-select' name="gender">
							<option value="">Select Marital Status</option>
							<option value="Single">Single</option>
							<option value="Married">Married</option>
							<option value="Divorced">Divorced</option>
							<option value="Widowed">Widowed</option>
							<option value="Seperated">Separated</option>
						</select>
					</div>
				</div>

				<div className='row m-4 px-2'>
					<button type="submit" onClick={handleSignUp} className="btn btn-custom-primary fw-semibold fs-5 my-2 py-3">Sign Up</button>
					{/* <input type="submit" className='col-12 btn btn-primary' value="Sign Up"/> */}
				</div>
			</form>
		</div>
	)
}