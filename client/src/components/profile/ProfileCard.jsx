'use client'

import DeleteDialogue from '../ui/DeleteDialogue';
import { useEffect, useState } from 'react';
import { handleProfileButtons, setInputValues } from '@/services/profile-service';
import { updateUser } from '@/services/user-service';

export default function ProfileCard() {
	const [email, setEmail] = useState(null);
	const [dob, setDob] = useState(null);
	const [gender, setGender] = useState(null);
	const [maritalStatus, setMaritalStatus] = useState(null);
	const [cardTitle, setCardTitle] = useState("Vault Details");

	useEffect(() => {
		setInputValues();
	}, []);


	return (
		<div className="container-fluid d-flex flex-column align-items-center col-12 p-md-4">
			<div className='text-center my-4 my-md-5 mt-5 mt-lg-5'>
				<h1 className="fw-bold">
					Welcome to your Vault, <span style={{color: 'rgb(238, 76, 12)'}}>Bhaumik!</span>
				</h1>
				<p className='m-0 text-muted fs-5 d-none d-md-block'>Here are your important details, Safe in your <b>Vault</b>.</p>
			</div>

			<div className='card-container mb-5 p-md-4 col-11 col-lg-6 mt-md-2'>
				<div className='text-center d-none d-md-block'>
					<h1 className='fs-3 mt-2 fw-semibold'>{cardTitle}</h1>
				</div>

				<div className="row m-4">
					<div className='col-12 col-lg-6 my-lg-2'>
						<label className="form-label fw-semibold my-2">Username</label>
						<input 
							id="profile-username-input" 
							className="form-control profile-input" 
							type="text" name="username" 
							placeholder="Enter new username" 
							required
							disabled
						/>
					</div>

					<div className="col-12 col-lg-6 my-2">
						<label className="form-label fw-semibold my-2 update-input">Email</label>
						<input 
							onChange={(e) => setEmail(e.target.value)} 
							className="form-control profile-input" 
							id='profile-email-input' 
							type="email" 
							name="email" 
							placeholder="Enter new email address" 
							required 
							disabled
						/>
					</div>

					<div className="col-12 col-lg-4 my-lg-2">
						<label className="form-label fw-semibold mt-2 mt-lg-4 update-input">Date of Birth</label>
						<input 
							onChange={(e) => setDob(e.target.value)} 
							id='profile-dob-input' 
							className="form-control profile-input" 
							type='date'
							disabled
						/>
					</div>

					<div className="col-12 col-lg-4 mt-lg-4">
						<label className="form-label fw-semibold mt-3 mt-lg-2">Gender</label>
						<input 
							id='profile-gender-input' 
							className="form-control profile-input" 
							disabled 
						/>

						<select 
							onChange={(e) => setGender(e.target.value)} 
							id='profile-gender-select' 
							className='form-select profile-select' 
							hidden
						>
							<option value="">Select Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>

					<div className="col-12 col-lg-4 mt-lg-4">
						<label className="form-label fw-semibold mt-3 mt-lg-2">Marital Status</label>
						<input 
							id='profile-marital-input' 
							className="form-control profile-input" 
							disabled 
						/>

						<select 
							onChange={(e) => setMaritalStatus(e.target.value)} 
							id='profile-marital-select' 
							className='form-select profile-select' 
							hidden
						>
							<option value="">Select Marital Status</option>
							<option value="Single">Single</option>
							<option value="Married">Married</option>
							<option value="Divorced">Divorced</option>
							<option value="Widowed">Widowed</option>
							<option value="Seperated">Separated</option>
						</select>
					</div>

				</div>

				<div className="w-100 my-2 password-container d-flex justify-content-center text-center">
					<button 
						onClick={(e) => {
							handleProfileButtons(e, true);
							setCardTitle("Edit Vault Details");
						}} 
						id='profile-edit-btn' 
						className='mx-3 my-3 btn btn-custom-primary btn-update btn-edit'
					>
						Edit
					</button>

					<button 
						onClick={(e) => {
							updateUser(e, {email, dob, gender, maritalStatus});
							handleProfileButtons(e, false);
							setCardTitle("Vault Details");
						}} 
						id="profile-save-btn" 
						className='mx-3 my-3 btn btn-custom-primary btn-update btn-save d-none'
					>
						Save
					</button>

					<button 
						onClick={(e) => {
							handleProfileButtons(e, false);
							setCardTitle("Vault Details");
						}} 
						id="profile-cancel-btn" 
						className='mx-3 my-3 btn btn-update btn-danger d-none'
					>
						Cancel
					</button>

					<DeleteDialogue />
				</div>
			</div>
		</div>
	);
}