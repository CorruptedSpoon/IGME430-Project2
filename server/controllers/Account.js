const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'all fields are reqired' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'wrong username or password' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/post' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'all fields are reqired' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'passwords do not match' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/post' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'this username is already in use' });
    }
    return res.status(400).json({ error: 'an error occurred' });
  }
};

const changePassword = async (req, res) => {
  const oldPass = `${req.body.oldPass}`;
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  if (!oldPass || !newPass || !newPass2) {
    return res.status(400).json({ error: 'all fields are reqired' });
  }

  if (newPass !== newPass2) {
    return res.status(400).json({ error: 'passwords do not match' });
  }

  const { username } = req.session.account;
  return Account.authenticate(username, oldPass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'wrong username or password' });
    }

    try {
      const hash = await Account.generateHash(newPass);
      await Account.updateOne(
        { _id: req.session.account._id },
        { password: hash },
      );
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'an error occurred' });
    }
    return res.status(200).json({ message: 'password changed' });
  });
};

// grants premium status to the current user
const givePremium = async (req, res) => {
  try {
    await Account.updateOne(
      { _id: req.session.account._id },
      { premium: true },
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'an error occurred' });
  }
  return res.status(200).json({ message: 'premium granted' });
};

// returns true if the current user has premium status
const hasPremium = async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.session.account._id }).exec();
    return res.status(200).json({ premium: account.premium });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'an error occurred' });
  }
};

const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

module.exports = {
  loginPage,
  logout,
  login,
  signup,
  givePremium,
  hasPremium,
  changePassword,
  getToken,
};
