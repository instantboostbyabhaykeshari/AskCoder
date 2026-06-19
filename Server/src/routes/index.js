const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.route'));
router.use('/users', require('./users.route'));
router.use('/posts', require('./posts.route'));
router.use('/tags', require('./tags.route'));
router.use('/posts/answers', require('./answers.route'));
router.use('/posts/comments', require('./comments.route'));

module.exports = router;
