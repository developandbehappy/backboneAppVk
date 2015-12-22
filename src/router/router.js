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
    this.home.render();
  },
  authByToken: function () {
    this.authByToken.render();
  }
});
