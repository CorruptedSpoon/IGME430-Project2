const models = require('../models');

const { Post } = models;

const postPage = (req, res) => res.render('post');
const stagePage = (req, res) => res.render('stage');
const accountPage = (req, res) => res.render('account');

// creates a new post object using the data from the request body
// saves it to the database if it is not a direct duplicate of an existing post
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

// add a like to a post with the given id
const addLike = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  try {
    const post = await Post.findOne(
      { _id: req.body.id },
    );
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

// remove a like from a post with the given id
const removeLike = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  try {
    const post = await Post.findOne(
      { _id: req.body.id },
    );
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
  let score = 100;
  if (views !== 0) score = 100 + ((((likes + 1) / views) - 0.5) * 100) - (age * 10);
  return score;
};

// update the score of a post with the given id using the heuristic function
const updateScore = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  try {
    const post = await Post.findOne(
      { _id: req.body.id },
    );
    await Post.updateOne(
      { _id: req.body.id },
      { views: post.views + 1 },
    );

    // convert the time elapsed to hours
    const age = (Date.now() - post.createdData) / 1000 / 60 / 60;
    const score = heuristic(post.likes, post.views + 1, age);
    await Post.updateOne(
      { _id: req.body.id },
      { score },
    );
    return res.status(200).json({ message: 'score updated' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: 'an error occurred' });
  }
};

// get the post with the highest score
const stagedPost = (req, res) => Post.findOne().sort({ score: -1 }).exec((err, doc) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'an error occurred' });
  }
  return res.status(200).json({ post: doc });
});

// get a random post, this is being used for the demo as it makes it easier to test
const randomPost = (req, res) => Post.count().exec((err, count) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'an error occurred' });
  }
  const random = Math.floor(Math.random() * count);
  Post.findOne().skip(random).exec((e, doc) => {
    if (e) {
      console.log(e);
      return res.status(400).json({ error: 'an error occurred' });
    }
    return res.status(200).json({ post: doc });
  });
  return;
});

// get all posts for the current user
const getPosts = (req, res) => Post.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'an error occurred' });
  }
  return res.status(200).json({ posts: docs });
});

module.exports = {
  postPage,
  stagePage,
  accountPage,
  createPost,
  addLike,
  removeLike,
  updateScore,
  stagedPost,
  randomPost,
  getPosts,
};
