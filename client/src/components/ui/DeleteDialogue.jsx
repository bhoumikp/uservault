'use client'

import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function DeleteDialogue() {
	const {setIsLoggedIn} = useAuth();
	const router = useRouter();

	const handleDeleteUser = async (e) => {
		e.preventDefault();
		try{
			const res = await axios.delete(`${API_ENDPOINT}/user`, {
				withCredentials: true
			});
			setIsLoggedIn(false);
			router.push('/');
		} catch(err) {
			alert(err.response?.data.message);
			console.log(err);
		}
	}

	return (
		<div>
			<button 
				type="button" 
				id="profile-delete-btn" 
				className='btn btn-danger btn-update btn-delete my-3 mx-3 px-0' 
				data-bs-toggle="modal" 
				data-bs-target="#delete-modal"
			>
				Delete Vault
			</button>

			<div className="modal fade" id="delete-modal" tabIndex="-1">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header px-4">
							<h1 className="modal-title fs-4">Confirm Delete</h1>
							<button 
							type="button" 
							className="btn-close" 
							data-bs-dismiss="modal"
							>
							</button>
						</div>

						<div className="modal-body py-4">
							Are you sure you want to <b>delete your vault</b>?
							<span className="text-danger fw-semibold">
								{" "}This will earse your data permanently and cannot be undone.
							</span>
						</div>

						<div className="modal-footer">
							<button 
								onClick={handleDeleteUser} 
								type="button" 
								className="btn btn-danger w-100" 
								data-bs-dismiss="modal"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}