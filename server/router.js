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
  app.put('/addVote', mid.requiresLogin, controllers.Quote.addVote);

  app.get('/getQuotes', mid.requiresLogin, controllers.Quote.getQuotes);
  app.get('/getOwnerQuotes', mid.requiresLogin, controllers.Quote.getOwnerQuotes);

  app.get('*', (req, res) => res.status(404).render('notFound'));
};

module.exports = router;
