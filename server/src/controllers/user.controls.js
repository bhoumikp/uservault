import userService from "../services/user.service.js";
import { getHashPassword } from "../utility/passwords.js";
import authControls from '../controllers/auth.controls.js';


const handleCreateUser = async (req, res) => {
	const payload = req.body;

	if (!payload.username || !payload.email || !payload.password) {
		return res.status(400).json({
			success: false,
			message: `Username or Email or Password cannot be empty.`
		});
	}

	payload.password = await getHashPassword(payload.password);

	try {
		const result = await userService.createUser(Object.values(payload));

		console.log(`Row inserted at Id ${result.insertId}`);
		return res.json({
			success: true,
			message: `User created with username ${payload.username}.`,
		});
	} catch (err) {
		console.log(`Inserting row failed`);

		const response = {
			success: false,
			message: `Database Error`,
			error: err
		}
		let stausCode = 500;

		if (err.code === "ER_DUP_ENTRY") {
			stausCode = 409;
			response.message = (err.code === "ER_DUP_ENTRY") && `Username ${payload.username} already exists`;
		}

		return res.status(stausCode).json(response);
	}
}


const handleGetUser = async (req, res) => {
	const username = req.username;

	try {
		const user = await userService.getUser(username);

		if (user) {
			console.log(`Row fetched successfully for username "${username}"`);
			return res.json({
				success: true,
				message: `User Found with username "${username}".`,
				user
			});
		} else {
			console.log(`Row does not exist for username "${username}"`);
			return res.status(404).json({
				success: false,
				message: `Username "${username}" not exist.`
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: `Database Error`,
			error: err
		});
	}
}


const handleUpdateUser = async (req, res) => {
	const username = req.username;
	const payload = req.body;

	if (!username) {
		console.log(`Username is missing`);
		return res.status(400).json({
			success: false,
			message: `Username is mmissing.`
		});
	}

	Object.keys(payload).forEach((item) => {
		if (!payload[item])
			delete payload[item];
	});

	if (!Object.keys(payload).length) {
		console.log(`No columns to update`);
		return res.status(400).json({
			success: false,
			message: `Please provide details of the user which has to be updated.`
		});
	}

	try {
		const user = await userService.updateUser(username, payload);
		console.log(`Row with username ${username} updated successfully`)
		console.log(user);
		return res.json({
			success: true,
			message: `User details updated successfully.`
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Database Error`,
			error: err
		});
	}
}


const handleDeleteUser = async (req, res) => {
	const username = req.username;

	try {
		const result = await userService.deleteUser(username);

		if (result.affectedRows) {
			console.log(`Row deleted for username "${username}"`)
			authControls.handleLogout(req, res);
			return res.json({
				success: true,
				message: `User ${username} deleted.`,
			})
		} else {
			console.log(`Row does not exist for username "${username}"`);
			return res.status(404).json({
				success: false,
				message: `Username ${username} does not exist.`,
			})
		}

	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: `Database Error`,
			error: err
		});
	}
}

export default {
	handleCreateUser,
	handleGetUser,
	handleUpdateUser,
	handleDeleteUser
}