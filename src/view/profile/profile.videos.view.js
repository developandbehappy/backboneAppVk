var app = app || {};
var Backbone = Backbone || {};

/**
 * ProfilePhoto component
 */
app.profileVideosView = Backbone.View.extend({
  el: '.container',
  resultData: false,
  initialize: function (params) {
    this.params = params;
  },
  render: function () {
    var data = this.resultData;
    this.fetchVideoData().then(function (response) {
      var myResponse = response.splice(1);
      console.log('myResponse', myResponse);
      console.log('myResponse', myResponse[0].title);

      var html = app.tpl.videoContent({
        title: myResponse.title,
        firstVideoSrc: myResponse.files,
        photoByVideo: myResponse.image
      });
      console.log('html', html);
      $('.profileContainerData').html(html);
    });
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
  }
});
