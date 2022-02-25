const db = require("../db");

class PostService {
	async insertPost({ title, description, user_id }) {
		const { rows } = await db.query(
			"INSERT INTO posts (title, descript, uid) VALUES ($1, $2, $3) RETURNING *",
			[title, description, user_id]
		);
		return rows[0];
	}

	async findPostById(id) {
		const { rows } = await db.query(
			"SELECT posts.id, title, descript, uid, likes_count, username, created_at FROM posts LEFT JOIN (SELECT pid, COUNT(*) AS likes_count FROM likes GROUP BY pid) likes ON posts.id = likes.pid INNER JOIN users ON posts.uid = users.id WHERE posts.id = $1",
			[id]
		);
		return rows[0];
	}

	async findAllPosts(user_id) {
		const { rows } = await db.query(
			"SELECT p.id, p.title, p.descript, p.created_at, likes_count, JSONB_AGG (to_jsonb(c)) AS comments FROM posts p LEFT JOIN (SELECT pid, COUNT(*) AS likes_count FROM likes GROUP BY pid) likes ON p.id = likes.pid LEFT JOIN (SELECT * FROM comments c) c ON p.id = c.pid WHERE p.uid = $1 GROUP BY p.id, likes_count ORDER BY created_at DESC",
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
