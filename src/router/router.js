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
    'authByToken': 'authByTokenHandler'
  },
  profileHandler: function () {
    if (this.isAuth()) {
      this.headerView.render();
      this.profileIndexView.render();
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
