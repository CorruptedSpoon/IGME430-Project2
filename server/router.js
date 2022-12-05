const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/post', mid.requiresLogin, controllers.Post.postPage);
  app.post('/post', mid.requiresLogin, controllers.Post.createPost);

  app.get('/stage', mid.requiresLogin, controllers.Post.stagePage);
  
  app.get('/account', mid.requiresLogin, controllers.Post.accountPage);

  app.get('/stagedPost', mid.requiresLogin, controllers.Post.stagedPost);

  app.post('/updateScore', mid.requiresLogin, controllers.Post.updateScore);

  app.post('/addLike', mid.requiresLogin, controllers.Post.addLike);
  app.post('/removeLike', mid.requiresLogin, controllers.Post.removeLike);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
