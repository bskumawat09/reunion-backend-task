const db = require("../db");

class UserService {
	async findUser({ user_id, username }) {
		let result;
		if (user_id) {
			const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [
				user_id
			]);
			result = rows[0];
		} else if (username) {
			const { rows } = await db.query(
				"SELECT * FROM users WHERE username = $1",
				[username]
			);
			result = rows[0];
		}
		return result;
	}

	async insertUser({ username, hashPassword }) {
		const { rows } = await db.query(
			"INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
			[username, hashPassword]
		);
		return rows[0];
	}
}

module.exports = new UserService();
