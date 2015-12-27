var app = app || {};
var Backbone = Backbone || {};

/**
 * ProfileAlbum component
 */
app.profileAlbumView = Backbone.View.extend({
  el: '.container',
  resultData: false,
  albumId: false,
  initialize: function (params) {
    this.params = params;
  },
  events: {
    'click .albumPhotoItem': 'openPhotoHandler'
  },
  renderAlbumList: function () {
    var html = '';
    console.log("RENDER_ALBUM_COMPONENT");
    var data = this.resultData;
    console.log('data', data);
    data.map(function (item) {
      html += app.tpl.albumItem({
        type: 'album_list',
        title: item.title,
        imageLink: item.thumb_src,
        id: item.aid
      });
    });
    $('.profileContainerData').html(html);
  },
  fetchAlbumListData: function () {
    var self = this;
    var url = app.vk.getAlbumsPhoto({
      need_covers: '1'
    });
    return url.then(function (response) {
      var result = response.response;
      self.resultData = result;
      return result;
    });
  },
  renderAlbumPhotos: function () {
    var html = '';
    console.log("RENDER_ALBUM_PHOTOS_COMPONENT");
    var data = this.resultData;
    data.map(function (item) {
      html += app.tpl.albumPhotoItem({
        type: 'album_photo',
        title: item.title,
        srcBig: item.src_big,
        imageLink: item.src,
        id: item.aid
      });
    });
    $('.profileContainerData').html(html);
  },
  fetchAlbumData: function (albumId) {
    this.albumId = albumId;
    var self = this;
    var url = app.vk.getPhotosAlbum({
      album_id: albumId
    });
    return url.then(function (response) {
      var result = response.response;
      console.log('result', result);
      self.resultData = result;
      return result;
    });
  },
  openPhotoHandler: function (e) {
    var $this = $(e.currentTarget);
    var link = $this.data('big');
    $.magnificPopup.open({
      items: {
        src: link
      },
      type: 'image'
    }, 0);
    console.log('openPhotoHandler');
  }
});
