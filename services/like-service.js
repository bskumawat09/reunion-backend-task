const db = require("../db");

class LikeServie {
	async like(pid, user_id) {
		const { rows } = await db.query(
			"INSERT INTO likes (pid, uid) VALUES ($1, $2) RETURNING *",
			[pid, user_id]
		);
		return rows[0];
	}

	async unlike(pid, uid) {
		const { rows } = await db.query(
			"DELETE FROM likes WHERE pid = $1 AND uid = $2 RETURNING *",
			[pid, uid]
		);
		return rows[0];
	}
}

module.exports = new LikeServie();
