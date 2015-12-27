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
  },
  getRelativesSibling: function (relatives) {
    var resultRelatives = relatives.filter(function (item) {
      return item.type === 'sibling'
    });
    return resultRelatives;
  },
  getRelationshipStatus: function (statusId, sex) {
    var mapMan = {
      1: 'Не женат',
      2: 'В отношениях',
      3: 'Помолвлен',
      4: 'Женат',
      5: 'Всё сложно',
      6: 'В активном поиске',
      7: 'Влюблен'
    };
    var mapWoman = {
      1: 'Не замужем',
      2: 'В отношениях',
      3: 'Помолвлена',
      4: 'Замужем',
      5: 'Всё сложно',
      6: 'В активном поиске',
      7: 'Влюблена'
    };
    if (sex === 1) {
      return mapWoman[statusId];
    } else {
      return mapMan[statusId];
    }
  }
  /*1 — не женат/не замужем;
   2 — есть друг/есть подруга;
   3 — помолвлен/помолвлена;
   4 — женат/замужем:
   5 — всё сложно;
   6 — в активном поиске;
   7 — влюблён/влюблена;
   0 — не указано..*/
};