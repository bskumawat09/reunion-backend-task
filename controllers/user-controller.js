const followService = require("../services/follow-service");
const userService = require("../services/user-service");

class UserController {
	async getUser(req, res) {
		try {
			const { user_id } = req.user;

			const user = await userService.findUser({ id: user_id });
			const followers = await followService.getFollowers(user_id);
			const followings = await followService.getFollowings(user_id);

			// add properties obtained from subqueries to user objects
			user.followers_count = followers.length;
			user.followings_count = followings.length;
			user.followers = followers;
			user.followings = followings;

			res.json({
				status: "success",
				user
			});
		} catch (err) {
			res.status(400).json({
				status: "error",
				message: err.message
			});
		}
	}

	async followUser(req, res) {
		try {
			const { id } = req.params; // id of user to be followed
			const { user_id } = req.user; // id of current logged-in user

			if (id == user_id) {
				throw new Error("cannot follow yourself");
			}

			const followee = await userService.findUser({ id });
			if (!followee) {
				throw new Error("user to be followed not found");
			}

			await followService.follow(user_id, id);

			res.json({
				status: "success",
				message: `started following ${followee.username}`
			});
		} catch (err) {
			res.status(400).json({
				status: "error",
				message: err.message
			});
		}
	}

	async unfollowUser(req, res) {
		try {
			const { id } = req.params; // id of user to be unfollowed
			const { user_id } = req.user; // id of current logged-in user

			if (id == user_id) {
				throw new Error("cannot unfollow yourself");
			}

			const followee = await userService.findUser({ id });
			if (!followee) {
				throw new Error("user to be unfollowed not found");
			}

			await followService.unfollow(user_id, id);

			res.json({
				status: "success",
				message: `unfollowed the user ${followee.username}`
			});
		} catch (err) {
			res.status(400).json({
				status: "error",
				message: err.message
			});
		}
	}
}

module.exports = new UserController();
