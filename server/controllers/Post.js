const models = require('../models');

const { Post } = models;

const postPage = (req, res) => res.render('post');
const stagePage = (req, res) => res.render('stage');

const createPost = async (req, res) => {
  if (!req.body.title || !req.body.body) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  const postData = {
    title: req.body.title,
    body: req.body.body,
    owner: req.session.account._id,
    username: req.session.account.username,
    likes: 0,
    views: 0,
    score: 100,
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
  if (!req.body.id) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  try {
    const post = await Post.findOne(
      { _id: req.body.id });
    console.log(post.likes);
    await Post.updateOne(
      { _id: req.body.id },
      { likes: post.likes + 1 },
    );
    return res.status(200).json({ message: 'added like' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: 'an error occurred' });
  }
};

const removeLike = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  try {
    const post = await Post.findOne(
      { _id: req.body.id });
    console.log(post.likes);
    await Post.updateOne(
      { _id: req.body.id },
      { likes: post.likes - 1 },
    );
    return res.status(200).json({ message: 'removed like' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: 'an error occurred' });
  }
};

// calculate a score for a post based on the number of likes, views, and age
// ideally this would also bsae the score on the current activity levels on the platform
// for now though it is based on posts recieving a low amount of likes and views
// as this is just a demo
const heuristic = (likes, views, age) => {
  console.log(`likes: ${likes}, views: ${views}, age: ${age}`);
  let score = 100;
  if(views !== 0) score = 100 + ((((likes + 1) / views) - 0.5) * 100);
  console.log(`score: ${score}`);
  return score;
};

const updateScore = async (req, res) => {
  if(!req.body.id) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  try {
    const post = await Post.findOne(
      { _id: req.body.id });
    await Post.updateOne(
      { _id: req.body.id },
      { views: post.views + 1 },
    );

    const age = (Date.now() - post.createdData) / 1000 / 60 / 60; // convert the time elapsed to hours
    const score = heuristic(post.likes, post.views + 1, age);
    await Post.updateOne(
      { _id: req.body.id },
      { score: score },
    );
    return res.status(200).json({ message: 'score updated' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: 'an error occurred' });
  }
};

const stagedPost = (req, res) => Post.findOne().sort({ score: -1 }).exec((err, doc) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'an error occurred' });
  }
  return res.status(200).json({ post: doc });
});

const getPosts = (req, res) => Post.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'an error occurred' });
  }
  return res.json({ posts: docs });
});

module.exports = {
  postPage,
  stagePage,
  createPost,
  deletePost,
  addLike,
  removeLike,
  updateScore,
  stagedPost,
  getPosts,
};
