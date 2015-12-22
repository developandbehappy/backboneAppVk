var app = app || {};
var Backbone = Backbone || {};

app.tpl = {
  homeTpl: function (context) {
    return this.getTpl(context, '#homeTpl');
  },
  authByTokenTpl: function (context) {
    return this.getTpl(context, '#authByTokenTpl');
  },
  getTpl: function (context, selector) {
    var source = $(selector).html();
    var template = Handlebars.compile(source);
    return template(context);
  }
};