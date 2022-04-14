const { rest } = require('underscore');
const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogout, controllers.Account.changePassword);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/app', mid.requiresLogin, controllers.Account.appPage);

  app.put('/setPremium', mid.requiresLogin, controllers.Account.setPremium);

  app.post('/addQuote', mid.requiresLogin, controllers.Quote.makeQuote);
  app.post('/addLocationQuote', mid.requiresLogin, controllers.Quote.makeLocationQuote);

  app.get('/getQuotes', mid.requiresLogin, controllers.Quote.getQuotes);
  app.get('/getLocationQuotes', mid.requiresLogin, controllers.Quote.getLocationQuotes);

  app.post('/makeJar', mid.requiresLogin, controllers.Jar.makeJar);
  app.get('/getJars', mid.requiresLogin, controllers.Jar.getJars);

  app.get('*', (req, res) => res.status(404).render('notFound'));
};

module.exports = router;
