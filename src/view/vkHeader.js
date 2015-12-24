var app = app || {};
var Backbone = Backbone || {};

app.header = Backbone.View.extend({
  el: '.container',
  initialize: function () {

  },
  render: function () {
    var html = app.tpl.header();
    $('.header').html(html);
  }
});