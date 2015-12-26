var app = app || {};
var Backbone = Backbone || {};

app.photo = Backbone.View.extend({
  el: '.container',
  initialize: function () {

  },
  render: function () {
    var html = '';
    this.token = app.token.getToken();
    this.getPhotosAlbum().then(function (response) {
      response.map(function (item) {
        html += app.tpl.photoContent({
          urlPhoto: item.src
        });
      });
      console.log('html', html);
      $('.profileContainerData').html(html);
    });
  },
  getPhotosAlbum: function () {
    var url = app.vk.getPhotosAlbum({
      album_id: '225763843'
    });
    return url.then(function (response) {
      return response.response;
    });
  }
  ,
  getAlbumsPhotoId: function () {
    var url = app.vk.getAlbumsPhoto();
    return url.then(function (response) {
      console.log('response', response.response);
      return response.response[0];
    });
  }
})
;
