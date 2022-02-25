const db = require("../db");

class FollowService {
	async follow(user_id, followee_id) {
		const { rows } = await db.query(
			"INSERT INTO follows (followee_id, follower_id) VALUES ($1, $2) RETURNING *",
			[followee_id, user_id]
		);
		return rows[0];
	}

	async getFollowers(user_id) {
		const { rows } = await db.query(
			"SELECT follower_id, username FROM follows INNER JOIN users ON users.id = follower_id WHERE followee_id = $1",
			[user_id]
		);
		return rows;
	}

	async getFollowings(user_id) {
		const { rows } = await db.query(
			"SELECT followee_id AS following_id, username FROM follows INNER JOIN users ON users.id = followee_id WHERE follower_id = $1",
			[user_id]
		);
		return rows;
	}

	async unfollow(user_id, followee_id) {
		const { rows } = await db.query(
			"DELETE FROM follows WHERE followee_id = $1 AND follower_id = $2 RETURNING *",
			[followee_id, user_id]
		);
		return rows[0];
	}
}

module.exports = new FollowService();
