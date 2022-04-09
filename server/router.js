const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.post('/changePassword', controllers.Account.changePassword);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/app', mid.requiresLogin, controllers.Account.appPage);

  app.post('/addQuote', mid.requiresLogin, controllers.Quote.makeQuote);
  app.post('/addLocationQuote', mid.requiresLogin, controllers.Quote.makeQuote);
  
  app.post('/setPremium', mid.requiresLogin, controllers.Account.setPremium);
};

module.exports = router;
