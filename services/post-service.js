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
			"SELECT posts.id, title, descript, uid, username, created_at FROM posts INNER JOIN users ON posts.uid = users.id WHERE posts.id = $1",
			[id]
		);
		return rows[0];
	}

	async findAllPosts(user_id) {
		const { rows } = await db.query(
			"SELECT * FROM posts WHERE uid = $1 ORDER BY created_at DESC",
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
