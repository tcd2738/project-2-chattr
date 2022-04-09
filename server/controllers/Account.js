const models = require('../models');

const { Account } = models;

const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

const loginPage = (req, res) => res.render('login', { csrfToken: req.csrfToken() });

const appPage = (req, res) => res.render('app');

const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/app' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/app' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    return res.status(400).json({ error: 'An error occurred.' });
  }
};

const changePassword = async (req, res) => {
  const username = `${req.body.username}`;
  const oldPass = `${req.body.oldPass}`;
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  if (!username || !oldPass || !newPass || !newPass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, oldPass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    if (newPass !== newPass2) {
      return res.status(400).json({ error: 'Passwords do not match!' });
    }
  
    try {
      const hash = await Account.generateHash(newPass);
      account.password = hash;
      await account.save();
      return res.json({ redirect: '/app' });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }
  });
};

const setPremium = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const premium = req.body.premium;

  if (!username || !pass || premium === null) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }
  
    try {
      account.isPremium = premium;
      req.session.account.isPremium = premium;
      await account.save();
      
      return res.status(200).json({ redirect: '/app' });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }
  });
}

module.exports = {
  getToken,
  loginPage,
  appPage,
  login,
  logout,
  signup,
  changePassword,
  setPremium
};
