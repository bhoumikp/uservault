import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
	return token;
};

const verifyToken = (token) => {
	return jwt.verify(token, JWT_SECRET);
};

export default {
	generateToken,
	verifyToken
}