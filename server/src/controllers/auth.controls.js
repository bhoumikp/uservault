import authService from '../services/auth.service.js';
import { validateUser } from '../utility/userValidation.js';


const handleGenerateToken = async (req, res) => {
	const payload = req.body;

	const validation = await validateUser(payload);

	if (!validation) {
		return res.status(400).json({
			success: false,
			message: "Invalid Password"
		})
	}

	if (validation === 'USER_NOT_FOUND') {
		return res.status(404).json({
			success: false,
			message: `User with username "${payload.username}" does not exist.`
		})
	}

	try {
		const token = authService.generateToken(payload);
		console.log(token);
		res.cookie("token", token, {
			httpOnly: true,
			secure: false,
			maxAge: 60 * 60 * 1000,
			sameSite: "lax",
		});

		return res.json({
			success: true,
			message: "User Logged In successfully.",
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			success: false,
			message: err.message,
			error: err.name
		});
	};
}

const handleVerifyToken = async (req, res) => {
	return res.json({
		isLoggedIn: true,
		message: "User is logged in."
	})
}

const handleLogout = async (req, res) => {
	res.cookie("token", "", {
		httpOnly: true,
		secure: false,
		maxAge: 0,
		sameSite: "lax",
	});

	res.json({
		success: true,
		message: "User logged out successfully."
	});
}

export default {
	handleGenerateToken,
	handleVerifyToken,
	handleLogout
}