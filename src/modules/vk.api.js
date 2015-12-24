var app = app || {};
var Backbone = Backbone || {};

app.vk = {
  apiLink: 'https://api.vk.com/method/',
  buildLink: function (method, params, token) {
    var tokenResult = "";
    var paramsResult = "";
    if (token) {
      tokenResult = token;
    } else {
      tokenResult = app.token.getToken();
    }
    console.log('params', params);
    if (params) {
      for (key in params) {
        if (params.hasOwnProperty(key)) {
          paramsResult += key + '=' + params[key] + '&';
        }
      }
      return this.apiLink + method + '?' + paramsResult + 'access_token=' + tokenResult;
    } else {
      return this.apiLink + method + '?access_token=' + tokenResult;
    }
  },
  userGet: function (params, token) {
    var url = this.buildLink('users.get', params, token);
    return $.get(url);
  },
  friendsGet: function (params, token) {
    var url = this.buildLink('friends.get', params, token);
    return $.get(url);
  }
};