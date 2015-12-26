var app = app || {};
var Backbone = Backbone || {};

/**
 * ProfilePost component
 */
app.profilePostView = Backbone.View.extend({
  el: '.container',
  resultData: false,
  initialize: function (params) {
    this.params = params;
  },
  render: function () {
    var data = this.resultData;
    console.log("RENDER_POST_COMPONENT");
    var stringResult = JSON.stringify(data);
    $('.profileContainerData').html("<h3>" + stringResult +"</h3>");
  },
  fetchData: function () {
    var self = this;
    return this.fetchPostData().then(function (result) {
      self.resultData = result;
      return result;
    });
  },
  fetchPostData: function () {
    var dfd = jQuery.Deferred();
    setTimeout(function () {
      dfd.resolve({
        post1: 'lorem_post',
        post3: '31231'
      });
    }, 300);
    return dfd.promise();
  }
});
