var app = app || {};
var Backbone = Backbone || {};

app.photo = Backbone.View.extend({
  el: '.container',
  events: {
    'click .thumb': 'drawPhotosClicked'
  },
  initialize: function () {

  },
  render: function () {
    var html = '';
    this.token = app.token.getToken();
    this.getAlbumsPhotoId().then(function (response) {
      response.map(function (item) {
        html += app.tpl.albumsPhoto({
          titleAlbum: item.title,
          firstPhotoFromAlbum: item.thumb_src,
          idAlbum: item.aid
        });
      });
      $('.profileContainerData').html(html);
    });
  },
  getAlbumsPhotoId: function () {
    var dataArray = [];
    var url = app.vk.getAlbumsPhoto({
      need_covers: '1'
    });
    return url.then(function (response) {
      response.response.map(function (item) {
        dataArray.push(item)
      });
      return dataArray;
    });
  },
  drawPhotosClicked: function (e) {
    var idAlbum = this.getId(e);
    var html = '';
    var url = app.vk.getPhotosAlbum({
      album_id: idAlbum
    });
    return url.then(function (response) {
      response.response.map(function (item) {
        html += app.tpl.photoContent({
          srcImg: item.src
        });
      });
      $('.profileContainerData').html(html);
    });
  },
  getId: function (e) {
    if (typeof e === 'string') {
      return e;
    } else {
      return e.currentTarget.id;
    }
  }
});
