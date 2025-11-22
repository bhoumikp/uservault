import { pool } from "../config/database.js";

const createUser = async (payload) => {
	const sql_query = `INSERT INTO users(username, email, password, dob, gender, maritalStatus) 
						values (?, ?, ?, ?, ?, ?)`;
	const [row] = await pool.query(sql_query, payload);
	return row;
};

const getUser = async (username) => {
	const sql_query = `SELECT * FROM users WHERE username=?`;
	const [row] = await pool.query(sql_query, [username]);
	return row[0];
};

const updateUser = async (username, payload) => {
	const columns = Object.keys(payload).map((clause) => `${clause}=?`).join(', ');
	const values = Object.values(payload);
	values.push(username);

	const sql_query = `UPDATE users SET ${columns} WHERE username=?`;
	const [row] = await pool.query(sql_query, values);
	return row;
};

const deleteUser = async (username) => {
	const sql_query = `DELETE FROM users WHERE username=?`;
	const [row] = await pool.query(sql_query, [username]);
	return row;
};

export default {
	createUser,
	getUser,
	updateUser,
	deleteUser
}