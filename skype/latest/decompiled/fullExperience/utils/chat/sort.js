define("utils/chat/sort", [], function () {
  return {
    byId: function (e, t) {
      return e.id - t.id;
    },
    byTimestamp: function (e, t) {
      return e.timestamp - t.timestamp;
    },
    byTimestampDescending: function (e, t) {
      return t.timestamp - e.timestamp;
    }
  };
})
