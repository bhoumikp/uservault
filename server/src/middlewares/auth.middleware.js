import authService from '../services/auth.service.js'
import userService from '../services/user.service.js'

export const auth = async (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: `No token provided.`,
		})
	}

	try {
		const loggedUser = authService.verifyToken(token);
		const dbUser = await userService.getUser(loggedUser.username);

		if (dbUser) {
			req.username = dbUser.username;
			req.verified = true;
			return next();
		}

		throw Error(`User with username ${payload.username} does not exist.`);
	} catch (err) {
		console.log(err);
		res.status(401).json({
			success: false,
			message: err.message,
			error: err.name
		})
	}
}

