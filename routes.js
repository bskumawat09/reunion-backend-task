const express = require("express");
const postController = require("./controllers/post-controller");
const userController = require("./controllers/user-controller");
const authController = require("./controllers/auth-controller");
const commentController = require("./controllers/comment-controller");
const authMiddleware = require("./middlewares/auth-middleware");

const router = express.Router();

// @request: POST "/api/authenticate"
// @desc: should perform user authentication and return a JWT token
router.post("/authenticate", authController.authenticateUser);

// @request: POST "/api/follow/{id}"
// @desc: authenticated user would follow user with {id}
router.post("/follow/:id", authMiddleware, userController.followUser);

// @request: POST "/api/unfollow/{id}"
// @desc: authenticated user would unfollow user with {id}
router.post("/unfollow/:id", authMiddleware, userController.unfollowUser);

// @request: GET "/api/user"
// @desc: should authenticate the request and return the respective user profile
router.get("/user", authMiddleware, userController.getUser);

// @request: POST "/api/posts"
// @desc: add a new post created by the authenticated user
router.post("/posts", authMiddleware, postController.createPost);

// @request: GET "/api/posts/{id}"
// @desc: return a single post with {id} populated with its number of likes and comments
router.get("/posts/:id", postController.getPost);

// @request: DELETE "api/posts/{id}"
// @desc: delete post with {id} created by the authenticated user
router.delete("/posts/:id", authMiddleware, postController.deletePost);

// @request: GET "api/all_posts"
// @desc: return all posts created by authenticated user sorted by post time
router.get("/all_posts", authMiddleware, postController.getAllPosts);

// @request: POST "/api/like/{id}"
// @desc: like the post with {id} by the authenticated user
router.post("/like/:id", authMiddleware, postController.likePost);

// @request: POST "/api/unlike/{id}"
// @desc: unlike the post with {id} by the authenticated user
router.post("/unlike/:id", authMiddleware, postController.unlikePost);

// @request: POST "/api/comment/{id}"
// @desc: add comment for post with {id} by the authenticated user
router.post("/comments/:id", authMiddleware, commentController.addComment);

// @request: POST "/api/register"
// @desc: register new user
router.post("/register", authController.registerUser);

module.exports = router;
