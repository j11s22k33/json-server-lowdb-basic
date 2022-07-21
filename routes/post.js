const express = require('express');
const router = express.Router();

const mAuth = require("../middlewares/auth");
const mPost = require("../middlewares/post");
const mMulter = require("../middlewares/formData");

router.get('/', mPost.getAllPost);
router.get('/:id', mPost.getPostByID);
router.post('/', mAuth.verifyToken, mMulter.single('image'), mPost.createPost);
router.patch('/:id', mAuth.verifyToken, mMulter.single('image'), mPost.updatePost);
router.delete('/:id', mAuth.verifyToken, mPost.deletePost);

module.exports = router;