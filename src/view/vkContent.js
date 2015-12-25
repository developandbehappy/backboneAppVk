var app = app || {};
var Backbone = Backbone || {};

app.home = Backbone.View.extend({
  el: '.container',
  events: {
    'click .status': 'changeStatus',
    'click #saveStatus': 'saveStatus'
  },
  initialize: function () {

  },
  render: function () {
    this.token = app.token.getToken();
    this.fetchUserData().then(function (response) {
      console.log('response', response);
      var html = app.tpl.homeContent({
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
    var url = app.vk.userGet({
      fields: 'photo_max,sex,city,bdate,country,online,has_mobile,last_seen,status,followers_count'
    });
    return url.then(function (response) {
      console.log('response', response);
      return response.response[0];
    });
  },
//  fetchFriendsData: function () {
//    var url = app.vk.friendsGet({
//      user_id: '',
//      order: 'random',
//      list_id: '',
//      count: '',
//      offset: '',
//      fields: 'nickname, domain, sex, bdate, city, country, timezone, photo_50, photo_100, photo_200_orig, has_mobile, contacts, education, online, relation, last_seen, status, can_write_private_message, can_see_all_posts, can_post, universities',
//      name_case: ''
//    });
//    return $.get(url).then(function (response) {
//      console.log('response', response);
//      return response.response[0];
//    });
//  }
  changeStatus: function () {
    $('#statusGroup').removeClass('hide');
    this.getInput().select();
  },
  saveStatus: function () {
    var getValInput = this.getInput().val();
    app.vk.setStatus({
      'text': getValInput,
    });
    $('.status').html(getValInput);
    $('#statusGroup').addClass('hide');
  },
  getInput: function () {
    return $('#statusGroup').find('input');
  }
});
