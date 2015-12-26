var app = app || {};
var Backbone = Backbone || {};

app.tpl = {
  homeTpl: function (context) {
    return this.getTpl(context, '#homeTpl');
  },
  authByTokenTpl: function (context) {
    return this.getTpl(context, '#authByTokenTpl');
  },
  header: function (context) {
    return this.getTpl(context, '#header');
  },
  homeContent: function (context) {
    return this.getTpl(context, '#homeContent');
  },
  albumItem: function (context) {
    return this.getTpl(context, '#albumItem');
  },
  albumPhotoItem: function (context) {
    return this.getTpl(context, '#albumPhotoItem');
  },
  photoContent: function (context) {
    return this.getTpl(context, '#photoContent');
  },
  getTpl: function (context, selector) {
    var source = $(selector).html();
    var template = Handlebars.compile(source);
    return template(context);
  }
};