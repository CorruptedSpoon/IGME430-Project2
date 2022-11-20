const models = require('../models');

const { Post } = models;

const postPage = (req, res) => res.render('post');

const createPost = async (req, res) => {
  if (!req.body.title || !req.body.body) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  const postData = {
    title: req.body.title,
    body: req.body.body,
    owner: req.session.account._id,
    likes: 0,
  };

  try {
    const newPost = new Post(postData);
    await newPost.save();
    return res.status(201).json({ title: newPost.title, body: newPost.body });
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      return res.status(400).json({ error: 'cannot create a duplicate post' });
    }
    return res.status(400).json({ error: 'an error occurred' });
  }
};

const deletePost = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  try {
    await Post.deleteOne({ _id: req.body.id, owner: req.session.account._id });
    return res.status(200).json({ message: 'post deleted' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: 'an error occurred' });
  }
};

const addLike = async (req, res) => {
  if (!req.body.id || !req.body.likes) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  try {
    await Post.updateOne(
      { _id: req.body.id, owner: req.session.account._id },
      { likes: req.body.likes + 1 },
    );
    return res.status(200).json({ message: 'added like' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: 'an error occurred' });
  }
};

const getPosts = (req, res) => Post.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'an error occurred' });
  }
  return res.json({ posts: docs });
});

module.exports = {
  postPage,
  createPost,
  deletePost,
  addLike,
  getPosts,
};
