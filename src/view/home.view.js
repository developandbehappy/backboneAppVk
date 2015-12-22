var app = app || {};
var Backbone = Backbone || {};

app.home = Backbone.View.extend({
  el: '.content',
  initialize: function () {

  },
  render: function () {
    var self = this;
    this.token = app.token.getToken();
    this.fetchUserData().then(function (response) {
      console.log('response', response);
      var html = app.tpl.homeTpl({
        avatarUrl: response.photo_max,
        firstName: response.first_name,
        lastName: response.last_name,
        city: response.city,
        country: response.country,
        followers_count: response.followers_count,
        has_mobile: response.has_mobile,
        last_seen: self.getDateLastVisit(response.last_seen),
        online: self.getOnlineById(response.online),
        sex: response.sex,
        status: response.status,
        uid: response.uid,
        bdate: response.bdate,
        sex: self.getSexById(response.sex),

      });
      $('.content').html(html);
    });
  },
  fetchUserData: function () {
    return $.get('https://api.vk.com/method/users.get?fields=photo_max,sex,city,bdate,country,online,has_mobile,last_seen,status,followers_count&access_token=' + this.token).then(function (response) {
      console.log('response', response);
      return response.response[0];
    });
  },
  getSexById: function (sex) {
    if(sex === 0) {
      return 'Пользователь не указал пол';
    } else if (sex === 1) {
      return 'Женский';
    } else {
      return 'Мужской'
    }
  },
  getOnlineById: function (onlineId) {
    if(onlineId === 0) {
      return 'Оффлайн';
    } else if (onlineId === 1) {
      return 'Онлайн';
    }
  },
  getDateLastVisit: function (lastVisit) {
    return new Date(lastVisit.time).getUTCDate();
  }
});
