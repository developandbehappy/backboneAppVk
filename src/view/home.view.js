var app = app || {};
var Backbone = Backbone || {};

app.home = Backbone.View.extend({
  el: '.content',
  initialize: function () {

  },
  render: function () {
    var html = app.tpl.homeTpl({});
    $('.content').html(html);
  }
});
