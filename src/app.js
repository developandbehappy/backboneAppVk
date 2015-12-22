var app = app || {};
var Backbone = Backbone || {};

$(function () {
  app.events = {};
  _.extend(app.events, Backbone.Events);
  app.router = new app.Router();
  Backbone.history.start();
});
