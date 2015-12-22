var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    this.home = new app.home();
    this.authByToken = new app.authByToken();
  },
  routes: {
    '': 'home',
    'authByToken': 'authByToken'

  },
  home: function () {
    if (this.isAuth()) {
      this.home.render();
    }
  },
  authByToken: function () {
    this.authByToken.render();
  },
  isAuth: function () {
    if (app.token.isValid()) {
      return true;
    } else {
      this.navigate('/authByToken', true);
      return false;
    }
  }
});
