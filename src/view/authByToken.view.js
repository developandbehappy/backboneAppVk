var app = app || {};
var Backbone = Backbone || {};

app.authByToken = Backbone.View.extend({
  initialize: function () {

  },
  render: function () {
    var html = app.tpl.authByTokenTpl({});
    $('.content').html(html);
  }
});
