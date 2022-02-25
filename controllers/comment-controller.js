const commentService = require("../services/comment-service");

class CommentController {
	async addComment(req, res) {
		try {
			const { id } = req.params;
			const { user_id } = req.user;
			const { text } = req.body;

			const comment = await commentService.insertComment({
				pid: id,
				user_id,
				text
			});
			res.json({
				status: "success",
				comment
			});
		} catch (err) {
			res.json({
				status: "error",
				message: err.message
			});
		}
	}
}

module.exports = new CommentController();
