define("jSkype/services/webapi/main", [
  "require",
  "jSkype/services/webapi/instance"
], function (e) {
  var t = e("jSkype/services/webapi/instance"), n;
  return {
    getInstance: function (e) {
      return n || (n = new t(e)), n;
    }
  };
})
