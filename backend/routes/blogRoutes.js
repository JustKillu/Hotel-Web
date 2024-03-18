const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/blog', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/blog', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    excerpt: req.body.excerpt,
    image: req.body.image,
    link: req.body.link
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete('/blog/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
    console.log("eliminado")
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
