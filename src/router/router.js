var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    this.home = new app.home();
    this.authByToken = new app.authByToken();
    this.header = new app.header();
    this.photoAlbum = new app.photo();
  },
  routes: {
    '': 'home',
    'authByToken': 'authByToken',
    'friends': 'friends',
    'album/:id': 'album'
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
  album: function (album) {
    if (this.isAuth()) {
      this.header.render();
      this.home.render();
      this.photoAlbum.drawPhotosClicked(album);
    }
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
