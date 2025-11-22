import bcrypt from 'bcrypt';
import userService from '../services/user.service.js';

export const getHashPassword = async (plainPassword) => {
	const saltRounds = 10;
	return await bcrypt.hash(plainPassword, saltRounds);
};

export const comparePasswords = async (payload) => {
	const { username, password } = payload;
	const user = await userService.getUser(username);
	if (user)
		return await bcrypt.compare(password, user.password);
	return false;
}