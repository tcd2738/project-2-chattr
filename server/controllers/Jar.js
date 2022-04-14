const models = require('../models');
const JarModel = require('../models/Jar');

const { Jar } = models;

// Get the jars associated with the current session.
const getJars = (req, res) => JarModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured!' });
  }
  return res.json({ Jars: docs });
});

// Make a new jar.
const makeJar = async (req, res) => {
  const jarName = `${req.body.jarName}`;
  // Owner is listed as the current session account holder.
  const owner = `${req.session.account._id}`;

  if (!jarName) {
    return res.status(400).json({ error: 'A jar name is required!' });
  }

  // Add the owner as the first user.
  const users = [];
  users.push(owner);

  const JarData = {
    jarName,
    owner,
    users,
  };

  try {
    const newJar = new Jar(JarData);
    await newJar.save();
    return res.status(201).json(
      { jarName: newJar.JarName, owner: newJar.owner, users: newJar.users },
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured.' });
  }
};

module.exports = {
  getJars,
  makeJar,
};
