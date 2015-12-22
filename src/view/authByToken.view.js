var app = app || {};
var Backbone = Backbone || {};

app.authByToken = Backbone.View.extend({
  el: '.content',
  events: {
    'click #tokenButton': 'getTokenHandler'
  },
  initialize: function () {

  },
  render: function () {
    var html = app.tpl.authByTokenTpl({});
    $('.content').html(html);
  },
  getTokenHandler: function () {
    var token = $('#tokenInput').val();
    this.testToken(token)
  },
  testToken: function (token) {
    $.get('https://api.vk.com/method/friends.get?id=339650720&fields=city&access_token=' + token).then(function (response) {
      if(response.error) {
        console.warn('Error: ', response.error.error_msg);
      } else {
        app.router.navigate("/", true);

      }
    });
  }
});
