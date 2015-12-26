var app = app || {};
var Backbone = Backbone || {};

app.home = Backbone.View.extend({
  el: '.container',
  initialize: function () {

  },
  render: function () {
    this.token = app.token.getToken();
    this.fetchUserData().then(function (response) {
      console.log('response', response);
      var html = app.tpl.homeTpl({
        online: app.dataByUser.getOnlineById(response.online),
        status: response.status,
        uid: response.uid,
        bdate: response.bdate,
        sex: app.dataByUser.getSexById(response.sex),
        country: response.country,
        city: response.city,
        has_mobile: response.has_mobile,
        last_seen: app.dataByUser.getDateLastVisit(response.last_seen),
        avatarUrl: response.photo_max,
        firstName: response.first_name,
        lastName: response.last_name,
        followers_count: response.followers_count
      });
      $('.content').html(html);
    });
  },
  fetchUserData: function () {
    var url = app.vk.buildLink('users.get', {
      fields: 'photo_max,sex,city,bdate,country,online,has_mobile,last_seen,status,followers_count'
    });
    return $.get(url).then(function (response) {
      console.log('response', response);
      return response.response[0];
    });
  }
});
