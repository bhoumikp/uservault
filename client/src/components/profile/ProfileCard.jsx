'use client'
import axios from 'axios';
import DeleteDialogue from './DeleteDialogue';
import './Profile.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function ProfileCard() {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState(null);
	const [dob, setDob] = useState(null);
	const [gender, setGender] = useState(null);
	const [maritalStatus, setMaritalStatus] = useState(null);
	const [cardTitle, setCardTitle] = useState("Vault Details");
	const [shouldFetchUser, setShouldFetchUser] = useState(false);
	
	const handleUpdate = async () => {
		const payload = [email, dob, gender, maritalStatus];
		try {
			const res = await axios.put(`${API_ENDPOINT}/user`, payload, {
				withCredentials: true
			});
			alert(res.data.message);
			setShouldFetchUser(true);
			console.log(user);
		} catch(err) {
			console.log(err);
			alert(err.response?.data.message);
		}
	}

	const handleEdit = (e) => {
		e.preventDefault();

		const saveBtn = document.getElementById('profile-save-btn');
		const cancelBtn = document.getElementById('profile-cancel-btn');
		const deleteBtn = document.getElementById('profile-delete-btn');

		e.target.classList.add('d-none');
		deleteBtn.classList.add('d-none');
		saveBtn.classList.remove('d-none');
		cancelBtn.classList.remove('d-none');

		handleProfileInputs("edit", "profile-email-input", null, null)
		handleProfileInputs("edit", "profile-dob-input", "date", null)
		handleProfileInputs("edit", "profile-gender-input", null, "profile-gender-select");
		handleProfileInputs("edit", "profile-marital-input", null, "profile-marital-select");

		setCardTitle("Edit Vault Details");
	}

	const handleCancel = (e) => {
		e.preventDefault();

		const saveBtn = document.getElementById('profile-save-btn');
		const editBtn = document.getElementById('profile-edit-btn');
		const deleteBtn = document.getElementById('profile-delete-btn');

		e.target.classList.add('d-none');
		saveBtn.classList.add('d-none');
		editBtn.classList.remove('d-none');
		deleteBtn.classList.remove('d-none');

		handleProfileInputs("cancel", "profile-email-input", null, null)
		handleProfileInputs("cancel", "profile-dob-input", "date", null)
		handleProfileInputs("cancel", "profile-gender-input", null, "profile-gender-select");
		handleProfileInputs("cancel", "profile-marital-input", null, "profile-marital-select");

		setCardTitle("Vault Details");
	}

	const handleSave = async (e) => {
		e.preventDefault();
		const payload = {email, dob, gender, maritalStatus};
		try {
			const res = await axios.put(`${API_ENDPOINT}/user`, payload, {
				withCredentials: true
			});
			alert(res.data.message);
			await fetchUser();

			const cancelBtn = document.getElementById('profile-cancel-btn');
			const editBtn = document.getElementById('profile-edit-btn');
			const deleteBtn = document.getElementById('profile-delete-btn');

			e.target.classList.add('d-none');
			cancelBtn.classList.add('d-none');
			editBtn.classList.remove('d-none');
			deleteBtn.classList.remove('d-none');


			handleProfileInputs("save", "profile-email-input", null, null)
			handleProfileInputs("save", "profile-dob-input", "date", null)
			handleProfileInputs("save", "profile-gender-input", null, "profile-gender-select");
			handleProfileInputs("save", "profile-marital-input", null, "profile-marital-select");

		} catch(err) {
			console.log(err);
			alert(err.response?.data.message);
		}
	}

	const handleProfileInputs = (op, id, type, selectId) => {
		const isEditing = (op==="edit");
		const profileInput = document.getElementById(id);

		if(selectId) {
			const selectInput = document.getElementById(selectId);
			profileInput.hidden = isEditing;
			selectInput.hidden = !isEditing;
			return;
		}

		// profileInput.value = '';
		profileInput.disabled = !isEditing;
		
		if(type) {
			return profileInput.type = type;
		}
		
		if(!isEditing) {
			return setInputValues();
		}
	}

	const setInputValues = () => {
		const username = document.getElementById('profile-username-input');
		const email = document.getElementById('profile-email-input');
		const dob = document.getElementById('profile-dob-input');
		const gender = document.getElementById('profile-gender-input');
		const genderSelect = document.getElementById('profile-gender-select');
		const maritalStatus = document.getElementById('profile-marital-input');
		const maritalStatusSelect = document.getElementById('profile-marital-select');
		
		if(user) {
			const formatedDOB = user.dob.split("T")[0];
			console.log(formatedDOB);
			username.value = `@${user.username}`;
			email.value = user.email;
			dob.value = formatedDOB;
			gender.value = user.gender;
			genderSelect.value = user.gender;
			maritalStatus.value = user.maritalStatus;
			maritalStatusSelect.value = user.maritalStatus
		}
	}

	const fetchUser = async () => {
		try {
			const res = await axios.get(`${API_ENDPOINT}/user`, {
				withCredentials: true
			});
			const user = res.data.user;
			// console.log(user);
			setUser(user);
		} catch(err) {
			console.log(err);
		}
	}


	useEffect(() => {
		fetchUser();
	}, []);
	
	useEffect(() => {
		setInputValues();
	}, [user])
	

	return (
		<div className="container-fluid d-flex flex-column align-items-center below-navbar">
			<div className='text-center my-5'>
				<h1 className="fw-bold">
					Welcome to your Vault, <span style={{color: 'rgb(238, 76, 12)'}}>Bhaumik!</span>
				</h1>
				<p className='m-0 text-muted fs-5'>Here are your important details, Safe in your <b>Vault</b>.</p>
			</div>

			<div className='card-container w-50 py-4'>
				<div className='text-center'>
					<h1 className='fs-3 mt-2 fw-semibold'>{cardTitle}</h1>
				</div>

				<div className="row m-4">
					<div className='col-6 my-2'>
						<label className="form-label fw-semibold my-2">Username</label>
						<div className='input-group'>
							<input disabled id="profile-username-input" className="form-control" type="text" name="username" placeholder="Enter new username" required/>
						</div>
					</div>
					<div className="col-6 my-2">
						<label className="form-label fw-semibold my-2">Email</label>
						<div className='input-group'>
							<input onChange={(e) => setEmail(e.target.value)} className="form-control" id='profile-email-input' type="email" name="email" placeholder={user?.email} required disabled/>
						</div>
					</div>
				</div>

				{/* <div className='row m-4'>
					<div className="col-6 my-2">
						<label className="form-label fw-semibold my-2">Password</label>
						<div className='input-group'>
							<input className="form-control" type="text" name="password" placeholder="•••••••••••••••••••••" required disabled/>
							<button className='btn btn-edit btn-custom-primary'>Edit</button>
						</div>
					</div>
				</div>				 */}

				<div className='row m-4'>
					<div className="col-4 my-2">
						<label className="form-label fw-semibold my-2">Date of Birth</label>
						<div className='input-group'>
							<input onChange={(e) => setDob(e.target.value)} id='profile-dob-input' className="form-control" name="dob" disabled/>
						</div>
					</div>
					<div className="col-4 my-2">
						<label className="form-label fw-semibold my-2">Gender</label>
						<div className='input-group'>
							<input id='profile-gender-input' className="form-control" disabled />
							<select onChange={(e) => setGender(e.target.value)} id='profile-gender-select' className='form-select' name="gender" hidden>
								<option value="">Select Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>
					</div>
					<div className="col-4 my-2">
						<label className="form-label fw-semibold my-2">Marital Status</label>
						<div className='input-group'>
							<input id='profile-marital-input' className="form-control" disabled />
							<select onChange={(e) => setMaritalStatus(e.target.value)} id='profile-marital-select' className='form-select' name="maritalStatus" hidden>
								<option value="">Select Marital Status</option>
								<option value="Single">Single</option>
								<option value="Married">Married</option>
								<option value="Divorced">Divorced</option>
								<option value="Widowed">Widowed</option>
								<option value="Seperated">Separated</option>
							</select>
							{/* <button onClick={(e) => handleEdit(e, 'profile-marital-input', null, "profile-marital-select")} className='btn btn-edit btn-custom-primary'>Edit</button> */}
						</div>
					</div>

				</div>

				<div className="w-100 my-2 password-container d-flex justify-content-center text-center">
					<button onClick={(e) => handleEdit(e)} id='profile-edit-btn' className='mx-3 my-3 btn btn-update btn-edit btn-custom-primary'>Edit</button>
					<button onClick={(e) => handleSave(e)} id="profile-save-btn" className='mx-3 my-3 btn btn-update btn-save btn-custom-primary d-none'>Save</button>
					<button onClick={(e) => handleCancel(e)} id="profile-cancel-btn" className='mx-3 my-3 btn btn-update btn-cancel btn-custom-primary d-none'>Cancel</button>
					<DeleteDialogue />
				</div>
				
			</div>


		</div>
	);
}