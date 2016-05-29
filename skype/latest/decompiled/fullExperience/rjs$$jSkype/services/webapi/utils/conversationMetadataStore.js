define("jSkype/services/webapi/utils/conversationMetadataStore", [], function () {
  var e = {};
  return {
    get: function (t) {
      if (typeof t == "string" && e[t])
        return e[t].syncState;
    },
    set: function (t, n) {
      typeof t == "string" && (e[t] = { syncState: n });
    },
    clear: function (t) {
      delete e[t];
    }
  };
});
