const passwordService = require("../services/password-service");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");
const bcrypt = require("bcrypt");

class AuthController {
	async authenticateUser(req, res) {
		try {
			const { username, password } = req.body;

			if (!username || !password) {
				throw new Error("all fields are required");
			}

			const user = await userService.findUser({ username });
			if (!user) {
				throw new Error("invalid username");
			}

			const isMatched = await passwordService.verifyPassword(
				password,
				user.password
			);
			if (!isMatched) {
				throw new Error("invalid password");
			}

			const payload = { user_id: user.id, username: user.username };
			const token = tokenService.generateToken(payload);

			res.cookie("token", token, {
				maxAge: 2 * 24 * 60 * 60 * 1000, // 2 day
				httpOnly: true
			});

			res.json({
				status: "success",
				jwt: token
			});
		} catch (err) {
			return res.status(400).json({
				status: "error",
				message: err.message
			});
		}
	}

	async registerUser(req, res) {
		try {
			const { username, password } = req.body;

			if (!username || !password) {
				throw new Error("all fields are required");
			}

			const hashPassword = await bcrypt.hash(password, 12);
			const user = await userService.insertUser({ username, hashPassword });

			const token = tokenService.generateToken({
				user_id: user.id,
				username: user.username
			});
			res.cookie("token", token, {
				maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
				httpOnly: true
			});

			res.json({
				status: "success",
				jwt: token,
				user
			});
		} catch (err) {
			return res.status(400).json({
				status: "error",
				message: err.message
			});
		}
	}
}

module.exports = new AuthController();
