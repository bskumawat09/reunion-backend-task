const db = require("../db");

class PostService {
	async insertPost({ title, description, user_id }) {
		const { rows } = await db.query(
			"INSERT INTO posts (title, descript, uid) VALUES ($1, $2, $3) RETURNING *",
			[title, description, user_id]
		);
		return rows[0];
	}
	// "SELECT * FROM posts LEFT JOIN (SELECT pid, COUNT(*) AS likes_count FROM likes GROUP BY pid) likes ON posts.id = likes.pid"
	// "SELECT posts.id, title, descript, uid, username, created_at FROM posts INNER JOIN users ON posts.uid = users.id WHERE posts.id = $1"
	async findPostById(id) {
		const { rows } = await db.query(
			"SELECT posts.id, title, descript, uid, likes_count, username, created_at FROM posts LEFT JOIN (SELECT pid, COUNT(*) AS likes_count FROM likes GROUP BY pid) likes ON posts.id = likes.pid INNER JOIN users ON posts.uid = users.id WHERE posts.id = $1",
			[id]
		);
		return rows[0];
	}

	async findAllPosts(user_id) {
		const { rows } = await db.query(
			"SELECT posts.id, title, descript, uid, likes_count, created_at FROM posts LEFT JOIN (SELECT pid, COUNT(*) AS likes_count FROM likes GROUP BY pid) likes ON posts.id = likes.pid WHERE uid = $1 ORDER BY created_at DESC",
			[user_id]
		);
		return rows;
	}

	async deletePost(id) {
		const { rows } = await db.query(
			"DELETE FROM posts WHERE id = $1 RETURNING *",
			[id]
		);
		return rows[0];
	}
}

module.exports = new PostService();
