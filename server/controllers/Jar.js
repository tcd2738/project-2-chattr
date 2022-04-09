const models = require('../models');
const JarModel = require('../models/Jar');

const { Jar, Quote } = models;

const getJars = (req, res) => JarModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured!' });
  }
  return res.json({ Jars: docs });
});

const makeJar = async (req, res) => {
    const jarName = `${req.body.jarName}`;

    if (!jarName) {
        return res.status(400).json({ error: 'A jar name is required!' });
    }

    const users = [];
    users.push(req.session.account._id);

    const JarData = {
        jarName: jarName,
        owner: req.session.account._id,
        users: users
    };

    try {
        const newJar = new Jar(JarData);
        await newJar.save();
        return res.status(201).json(
            {jarName: newJar.JarName, owner: newJar.owner, users: newJar.users}
        );
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured.' });
    }
}

module.exports = {
    getJars,
    makeJar
};