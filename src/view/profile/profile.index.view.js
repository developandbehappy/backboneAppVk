var app = app || {};
var Backbone = Backbone || {};
var DEFAULT_TYPE = 'about';

app.profileIndexView = Backbone.View.extend({
  el: '.container',
  events: {
    'click .status': 'changeStatus',
    'click #saveStatus': 'saveStatus'
  },
  initialize: function () {
    this.type = DEFAULT_TYPE;
    this.params = {};
    this.profileAboutView = new app.profileAboutView();
    this.profilePostView = new app.profilePostView();
    this.profileAlbumView = new app.profileAlbumView();
    this.profileVideosView = new app.profileVideosView();
  },
  navigate: function (type, params) {
    this.type = type || DEFAULT_TYPE;
    this.params = params || {};
    console.log('this.type', this.type);
    console.log('this.params', this.params);
    this.render();
  },
  render: function () {
    var self = this;
    this.token = app.token.getToken();
    this.fetchUserData().then(function (response) {
      var onlineStatus = app.dataByUser.getOnlineById(response.online);
      var userStatus = app.dataByUser.getDataStatus(response.status);
      var html = app.tpl.homeContent({
        online: onlineStatus,
        status: userStatus,
        uid: response.uid,
        avatarUrl: response.photo_max,
        firstName: response.first_name,
        lastName: response.last_name,
        followers_count: response.followers_count,
        counters: response.counters
      });
      $('.content').html(html);
      if (self.type === 'about') {
        self.profileAboutView.fetchData().then(function () {
          self.profileAboutView.render();
        });
      }
      if (self.type === 'post') {
        self.profilePostView.fetchData().then(function () {
          self.profilePostView.render();
        });
      }
      if (self.type === 'album') {
        if (self.params.id) {
          self.profileAlbumView.fetchAlbumData(self.params.id).then(function () {
            self.profileAlbumView.renderAlbumPhotos();
          });
        } else {
          self.profileAlbumView.fetchAlbumListData().then(function () {
            self.profileAlbumView.renderAlbumList();
          });
        }
      }
      if (self.type === 'video') {
        self.profileVideosView.fetchData().then(function () {
          self.profileVideosView.render();
        });
      }
    });
  },
  fetchUserData: function () {
    var url = app.vk.userGet({
      fields: 'photo_max,sex,city,bdate,country,online,has_mobile,last_seen,status,followers_count,counters'
    });
    return url.then(function (response) {
      return response.response[0];
    });
  },
  changeStatus: function () {
    $('#statusGroup').removeClass('hide');
    this.getInput().select();
  },
  saveStatus: function () {
    var getValInput = this.getInput().val();
    app.vk.setStatus({
      'text': getValInput
    });
    $('.status').html(app.dataByUser.getDataStatus(getValInput));
    $('#statusGroup').addClass('hide');
  },
  getInput: function () {
    return $('#statusGroup').find('input');
  }
});
