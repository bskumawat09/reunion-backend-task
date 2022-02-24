const db = require("../db");

class CommentService {
	async findComments(id) {
		const { rows } = await db.query(
			"SELECT comments.id, text, username, uid, pid, created_at FROM comments INNER JOIN users ON comments.uid = users.id WHERE comments.pid = $1",
			[id]
		);
		return rows;
	}

	async insertComment({ pid, user_id, text }) {
		const { rows } = await db.query(
			"INSERT INTO comments (text, pid, uid) VALUES ($1, $2, $3) RETURNING *",
			[text, pid, user_id]
		);
		return rows[0];
	}
}

module.exports = new CommentService();
