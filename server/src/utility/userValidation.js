import userService from '../services/user.service.js'
import bcrypt from 'bcrypt';

export const getHashedPassword = async (plainPassword) => {
	const saltRounds = 10;
	return await bcrypt.hash(plainPassword, saltRounds);
};

export const validateUser = async (payload) => {
	const { username, password } = payload;
	const user = await userService.getUser(username);
	if (!user)
		return "USER_NOT_FOUND";
	return await bcrypt.compare(password, user.password);
}