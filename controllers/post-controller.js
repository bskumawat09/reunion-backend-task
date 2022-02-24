const commentService = require("../services/comment-service");
const postService = require("../services/post-service");

class PostController {
	async createPost(req, res) {
		try {
			const payload = req.body;
			const { user_id } = req.user;

			const post = await postService.insertPost({
				...payload,
				user_id
			});

			res.json({
				status: "success",
				post
			});
		} catch (err) {
			res.status(400).json({
				status: "error",
				message: err.message
			});
		}
	}

	async deletePost(req, res) {
		try {
			const { id } = req.params;
			const post = await postService.findPostById(id);

			if (post.uid != req.user.user_id) {
				throw new Error("you are not authorized to perform this operation");
			}

			await postService.deletePost(id);

			res.json({
				status: "success",
				post
			});
		} catch (err) {
			res.status(400).json({
				status: "error",
				message: err.message
			});
		}
	}

	async getPost(req, res) {
		try {
			const { id } = req.params;

			const post = await postService.findPostById(id);
			if (!post) {
				throw new Error("post not found");
			}
			const comments = await commentService.findComments(id);
			post.comments = comments;

			res.json({
				status: "success",
				post
			});
		} catch (err) {
			console.log(err.message);
		}
	}

	async getAllPosts(req, res) {
		try {
			const { user_id } = req.user;
			const posts = await postService.findAllPosts(user_id);

			res.json({
				status: "success",
				results: posts.length,
				posts
			});
		} catch (err) {
			console.log(err.message);
		}
	}

	likePost(req, res) {}

	unlikePost(req, res) {}
}

module.exports = new PostController();
