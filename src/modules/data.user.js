var app = app || {};
var Backbone = Backbone || {};

app.dataByUser = {
  getSexById: function (sex) {
    if (sex === 0) {
      return 'Пользователь не указал пол';
    } else if (sex === 1) {
      return 'Женский';
    } else {
      return 'Мужской'
    }
  },
  getOnlineById: function (onlineId) {
    if (onlineId === 0) {
      return 'Оффлайн';
    } else if (onlineId === 1) {
      return 'Онлайн';
    }
  },
  getDateLastVisit: function (lastVisit) {
    return new Date(lastVisit.time).getUTCDate();
  },
  getDataStatus: function (status) {
    if (status === '') {
      return 'Изменить статус';
    }
    return status;
  }
};