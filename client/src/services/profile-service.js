import { fetchUser } from "./user-service";


const handleProfileInputs = (isEditing) => {
	const emailInput = document.getElementById("profile-email-input");
	emailInput.value = "";
	emailInput.disabled = !isEditing;

	const dobInput = document.getElementById("profile-dob-input");
	dobInput.type = "date";
	dobInput.value = "";
	dobInput.disabled = !isEditing;

	const genderInput = document.getElementById("profile-gender-input");
	const genderSelect = document.getElementById("profile-gender-select");
	genderSelect.value = "";
	genderInput.hidden = isEditing;
	genderSelect.hidden = !isEditing;

	const maritalStatusInput = document.getElementById("profile-marital-input");
	const maritalStatusSelect = document.getElementById("profile-marital-select");
	maritalStatusSelect.value = "";
	maritalStatusInput.hidden = isEditing;
	maritalStatusSelect.hidden = !isEditing;
}


const handleButtonsVisibility = () => {
	const editBtn = document.getElementById('profile-edit-btn');
	const deleteBtn = document.getElementById('profile-delete-btn');
	const saveBtn = document.getElementById('profile-save-btn');
	const cancelBtn = document.getElementById('profile-cancel-btn');

	editBtn && editBtn.classList.toggle('d-none');
	deleteBtn && deleteBtn.classList.toggle('d-none');
	saveBtn && saveBtn.classList.toggle('d-none');
	cancelBtn && cancelBtn.classList.toggle('d-none');
}


export const setInputValues = async () => {
	const user = await fetchUser();

	const username = document.getElementById('profile-username-input');
	const email = document.getElementById('profile-email-input');
	const dob = document.getElementById('profile-dob-input');
	const gender = document.getElementById('profile-gender-input');
	const maritalStatus = document.getElementById('profile-marital-input');

	if (user) {
		const formatedDOB = user.dob.split("T")[0];

		username.value = `@${user.username}`;
		console.log(user.email);
		email.value = user.email;
		dob.value = formatedDOB;
		gender.value = user.gender;
		maritalStatus.value = user.maritalStatus;
	}
}


export const handleProfileButtons = (e, isEditing) => {
	e.preventDefault();
	handleButtonsVisibility();
	handleProfileInputs(isEditing);
	!isEditing && setInputValues();
}
