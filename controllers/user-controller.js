const userService = require("../services/user-service");

class UserController {
	async getUser(req, res) {
		try {
			const { user_id } = req.user;

			const user = await userService.findUser({ user_id });

			res.json({
				status: "success",
				user
			});
		} catch (err) {
			console.log(err.message);
		}
	}

	followUser(req, res) {}

	unfollowUser(req, res) {}
}

module.exports = new UserController();
