var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    this.authByTokenView = new app.authByTokenView();
    this.profileIndexView = new app.profileIndexView();
    this.baseHeaderView = new app.baseHeaderView();
//    this.profileAboutView = new app.profileAboutView();
//    this.profilePhotoView = new app.profilePhotoView();
  },
  routes: {
    '': 'profileHandler',
    'post': 'profilePostHandler',
    'album': 'profileAlbumHandler',
    'album/:id': 'profileAlbumHandler',
    'video': 'profileVideoHandler',
    'authByToken': 'authByTokenHandler'
  },
  profileHandler: function () {
    if (this.isAuth()) {
      this.baseHeaderView.render();
      this.profileIndexView.navigate('about');
    }
  },
  profilePostHandler: function () {
    if (this.isAuth()) {
      this.baseHeaderView.render();
      this.profileIndexView.navigate('post');
    }
  },
  profileAlbumHandler: function (id) {
    if (this.isAuth()) {
      this.baseHeaderView.render();
      this.profileIndexView.navigate('album', {
        id: id
      });
    }
  },
  profileVideoHandler: function () {
    if (this.isAuth()) {
      this.baseHeaderView.render();
      this.profileIndexView.navigate('video');
    }
  },
  authByTokenHandler: function () {
    this.authByTokenView.render();
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
