define("jSkype/services/serviceAccessLayer/builders/factory", [
  "require",
  "jSkype/services/serviceAccessLayer/builders/uriBuilder",
  "jSkype/services/serviceAccessLayer/builders/headerBuilder"
], function (e) {
  var t = e("jSkype/services/serviceAccessLayer/builders/uriBuilder"), n = e("jSkype/services/serviceAccessLayer/builders/headerBuilder"), r = {
      uriBuilder: function () {
        return new t();
      },
      headerBuilder: function () {
        return new n();
      }
    }, i = {
      get: function (e) {
        var t = r[e];
        if (typeof t == "function")
          return t();
      }
    };
  return i;
})
