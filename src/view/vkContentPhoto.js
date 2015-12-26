var app = app || {};
var Backbone = Backbone || {};

app.photo = Backbone.View.extend({
  el: '.container',
  events: {
    'click .thumb': 'drawPhotos'
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
//  getPhotosAlbum: function () {
//    var dataPhotos = this.getAlbumsPhotoId();
//    return dataPhotos.then(function (response) {
//      var arrayOfPromise = response.map(function (item) {
//        return app.vk.getPhotosAlbum({
//          album_id: item
//        });
//      });
//      return $.when.apply($, arrayOfPromise);
//    }).then(function () {
//      return [].slice.call(arguments);
//    }).then(function (responseArray) {
//      return responseArray.map(function (item) {
//        return item[0].response;
//      });
//    });
//    var url = app.vk.getPhotosAlbum({
//      album_id: '225763843'
//    });
//    return url.then(function (response) {
//      return response.response;
//    });
//  }
//  ,
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
  drawPhotos: function (e) {
    var html = '';
    var idAlbumPhoto = e.currentTarget.id;
    var url = app.vk.getPhotosAlbum({
      album_id: idAlbumPhoto
    });
    return url.then(function (response) {
      response.response.map(function (item) {
        html += app.tpl.photoContent({
          srcImg: item.src
        });
      });
      $('.profileContainerData').html(html);
    });
  }
});
