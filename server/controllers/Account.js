const models = require('../models');

const { Account } = models;

// Gets the security token from the server.
const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

// Displays the 'login' page if the security token is foun.d
const loginPage = (req, res) => res.render('login', { csrfToken: req.csrfToken() });

// Displays the app page.
const appPage = (req, res) => res.render('app');

// Logs out the user and redirects back to the login page.
const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

// Logs the user in if the provided account info is correct.
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

// Creates an account and adds it to the MongoDB.
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

// Changes the password of an account if the provided account info is correct.
const changePassword = async (req, res) => {
  const username = `${req.body.username}`;
  const oldPass = `${req.body.oldPass}`;
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  if (!username || !oldPass || !newPass || !newPass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const currentAccount = await Account.authenticate(username, oldPass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    if (newPass !== newPass2) {
      return res.status(400).json({ error: 'Passwords do not match!' });
    }

    return account;
  });

  try {
    const hash = await Account.generateHash(newPass);
    currentAccount.password = hash;
    await currentAccount.save();
    return res.json({ redirect: '/app' });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(400).json({ error: 'An error occurred.' });
    }
    return false;
  }
};

module.exports = {
  getToken,
  loginPage,
  appPage,
  login,
  logout,
  signup,
  changePassword,
};
