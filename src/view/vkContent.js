var app = app || {};
var Backbone = Backbone || {};

app.home = Backbone.View.extend({
  el: '.container',
  events: {
    'click .status': 'changeStatus',
    'click #saveStatus': 'saveStatus'
  },
  initialize: function () {
    this.photoView = new app.photo();

  },
  render: function () {
    var self = this;
    this.token = app.token.getToken();
    this.fetchUserData().then(function (response) {
      var html = app.tpl.homeContent({
        online: app.dataByUser.getOnlineById(response.online),
        status: app.dataByUser.getDataStatus(response.status),
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
        followers_count: response.followers_count,
//      counter
        counters: response.counters
      });
      $('.content').html(html);
      self.photoView.render();
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
      'text': getValInput,
    });
    $('.status').html(app.dataByUser.getDataStatus(getValInput));
    $('#statusGroup').addClass('hide');
  },
  getInput: function () {
    return $('#statusGroup').find('input');
  }
});
