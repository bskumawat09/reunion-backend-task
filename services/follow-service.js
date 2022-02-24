const db = require("../db");

class FollowService {
	async follow(user_id, followee_id) {
		const { rows } = await db.query(
			"INSERT INTO follows (followee_id, follower_id) VALUES ($1, $2) RETURNING *",
			[followee_id, user_id]
		);
		return rows[0];
	}

	async unfollow() {}
}

module.exports = new FollowService();
