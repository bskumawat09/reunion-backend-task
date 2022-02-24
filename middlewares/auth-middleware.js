const tokenService = require("../services/token-service");
const userService = require("../services/user-service");

module.exports = async function (req, res, next) {
	try {
		const { token } = req.cookies;
		// if token not found in cookies
		if (!token) {
			throw new Error("token not found");
		}
		// if token does not verify
		const decodedToken = tokenService.verifyToken(token);
		if (!decodedToken) {
			throw new Error("invalid token");
		}
		console.log(decodedToken);
		// if the user associated with token no longer exist
		const user = await userService.findUser({ user_id: decodedToken.user_id });
		if (!user) {
			throw new Error("user no longer exist");
		}

		req.user = decodedToken;
		console.log("req.user:", req.user);
		next();
	} catch (err) {
		res.status(401).json({
			status: "error",
			message: err.message
		});
	}
};
