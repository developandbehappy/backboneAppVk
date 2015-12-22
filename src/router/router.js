var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    this.authByToken = new app.authByToken();
    this.home = new app.home();
  },
  routes: {
    '': 'home'
  },
  home: function () {
    this.newsView.render();
  }
});
