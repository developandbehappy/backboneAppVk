var app = app || {};
var Backbone = Backbone || {};

/**
 * ProfileAbout component
 */
app.profileAboutView = Backbone.View.extend({
  el: '.container',
  resultData: false,
  initialize: function (params) {
    this.params = params;
  },
  render: function () {
    var html = '';
    console.log("RENDER_ABOUT_COMPONENT");
    var data = this.resultData;
    console.log('data', data);

    data.map(function (item) {
      var resultRelatives = app.dataByUser.getRelativesSibling(item.relatives)[0];
      var sexProfile = app.dataByUser.getSexById(item.sex);
      var lastSeen = app.dataByUser.getDateLastVisit(item.last_seen);
      var familyStat = app.dataByUser.getRelationshipStatus(item.relation, item.sex);
      html += app.tpl.aboutContent({
        last_seen: lastSeen,
        bdate: item.bdate,
        sex: sexProfile,
        country: item.country,
        city: item.city,
        has_mobile: item.has_mobile,
        site: item.site,
        relatives: resultRelatives.name,
        relation: familyStat
      });
    });
    $('.profileContainerData').html(html);
  },
  fetchData: function () {
    var self = this;
    return this.fetchAboutData().then(function (result) {
      self.resultData = result;
      return result;
    });
  }
  ,
  fetchAboutData: function () {
    var url = app.vk.userGet({
      fields: 'sex,city,bdate,country,online,has_mobile,last_seen,site,relatives,relation'
    });
    return url.then(function (response) {
      var result = response.response;
      self.resultData = result;
      return result;
    });
  }
})
;
