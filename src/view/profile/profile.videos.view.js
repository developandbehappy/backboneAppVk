var app = app || {};
var Backbone = Backbone || {};

/**
 * ProfileVideo component
 */
app.profileVideosView = Backbone.View.extend({
  el: '.container',
  resultData: false,
  events: {
    'click .videoBlock': 'popupVideoBlock'
  },
  initialize: function (params) {
    this.params = params;
  },
  render: function () {
    var data = this.resultData;
    var html = '';
    data.map(function (item) {
      console.log('item', item);
      html += app.tpl.videoContent({
        title: item.title,
        urlImgByVideo: item.image,
        player: item.player
      });
    });
    $('.profileContainerData').html(html);
  },
  fetchData: function () {
    var self = this;
    return this.fetchVideoData().then(function (result) {
      console.log('result', result);
      self.resultData = result;
      return result;
    });
  },
  fetchVideoData: function () {
    var url = app.vk.getVideos();
    return url.then(function (response) {
      return response.response;
    })
  },
  popupVideoBlock: function (e) {
    var $this = $(e.currentTarget);
    var link = $this.data('idplayer');
    console.log('$this', $this[0]);
    console.log('link', link);
    $.magnificPopup.open({
      items: {
        src: '<iframe src=' + link + ' width="100%" height="100%" frameborder="0" scrolling="0"></iframe>',
        type: 'inline'
      }
    }, 0);
    console.log('openPhotoHandler');
  }
})
;
