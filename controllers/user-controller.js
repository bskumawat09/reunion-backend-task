const followService = require("../services/follow-service");
const userService = require("../services/user-service");

class UserController {
	async getUser(req, res) {
		try {
			const { user_id } = req.user;

			const user = await userService.findUser({ id: user_id });

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
			const { id } = req.params;
			const { user_id } = req.user;

			if (id == user_id) {
				throw new Error("cannot follow yourself");
			}

			const followee = await userService.findUser({ id });
			if (!followee) {
				throw new Error("user to be followed not found");
			}

			const response = await followService.follow(user_id, id);

			res.json({
				status: "success",
				message: `started following ${followee.username}`,
				follows: response
			});
		} catch (err) {
			res.status(400).json({
				status: "error",
				message: err.message
			});
		}
	}

	unfollowUser(req, res) {}
}

module.exports = new UserController();
