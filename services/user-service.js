const db = require("../db");

class UserService {
	async findUser({ id, username }) {
		let result;
		if (id) {
			// SELECT users.id, username, followers, password FROM users LEFT JOIN (SELECT followee_id AS uid, COUNT(follower_id) AS followers FROM follows GROUP BY uid) follows ON follows.uid = users.id WHERE users.id = $1
			const { rows } = await db.query(
				"SELECT * FROM users WHERE users.id = $1",
				[id]
			);
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
