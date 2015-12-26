var app = app || {};
var Backbone = Backbone || {};

/**
 * ProfileAlbum component
 */
app.profileAlbumView = Backbone.View.extend({
  el: '.container',
  resultData: false,
  initialize: function (params) {
    this.params = params;
  },
  render: function () {
    var html = '';
    console.log("RENDER_ALBUM_COMPONENT");
    var data = this.resultData;
    data.map(function (item) {
      html += app.tpl.albumsPhoto({
        titleAlbum: item.title,
        firstPhotoFromAlbum: item.thumb_src,
        idAlbum: item.aid
      });
    });
    $('.profileContainerData').html(html);
  },
  fetchData: function () {
    var self = this;
    return this.fetchAlbumData().then(function (result) {
      self.resultData = result;
      return result;
    });
  },
  fetchAlbumData: function () {
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
  }
});
