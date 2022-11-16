const models = require('../models');

const { Domo } = models;

const makerPage = (req, res) => res.render('app');

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.money) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    money: req.body.money,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age, money: newDomo.money });
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(400).json({ error: 'An error occurred!' });
  }
};

const giveMoney = async (req, res) => {
  if (!req.body.id || !req.body.money || !req.body.money) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    await Domo.updateOne(
      { _id: req.body.id, owner: req.session.account._id },
      { money: req.body.money + 10 },
    );
    return res.status(200).json({ message: 'Money updated' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: 'An error occurred!' });
  }
};

const getDomos = (req, res) => Domo.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred!' });
  }
  return res.json({ domos: docs });
});

module.exports = {
  makerPage,
  makeDomo,
  giveMoney,
  getDomos,
};
