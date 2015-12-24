var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    this.home = new app.home();
    this.authByToken = new app.authByToken();
    this.header = new app.header();
  },
  routes: {
    '': 'home',
    'authByToken': 'authByToken',
    'friends': 'friends'

  },
  home: function () {
    if (this.isAuth()) {
      this.header.render();
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
