const models = require('../models');
const DomoModel = require('../models/Domo');

const { Domo } = models;

const makerPage = (req, res) => res.render('app');

const getDomos = (req, res) => DomoModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured!' });
  }
  return res.json({ domos: docs });
});

const deleteDomo = (req, res) => DomoModel.deleteOne({ name: req.body.name }, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured!' });
  }
  console.log(docs);
  return res.json({ msg: 'The domo has been deleted' });
});

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.powerLvl) {
    return res.status(400).json({ error: 'All attributes are required!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    powerLvl: req.body.powerLvl,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json(
      { name: newDomo.name, age: newDomo.age, powerLvl: newDomo.powerLvl },
    );
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists! ' });
    }
    return res.status(400).json({ error: 'An error occured.' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  deleteDomo,
  getDomos,
};
