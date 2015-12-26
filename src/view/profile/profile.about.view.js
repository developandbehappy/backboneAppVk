var app = app || {};
var Backbone = Backbone || {};

app.home = Backbone.View.extend({
  el: '.container',
  render: function () {
    console.log("RENDER_ABOUT_COMPONENT");
  }
});
