define("jSkype/services/messageSearch/main", [
  "require",
  "exports",
  "module",
  "reqwest",
  "swx-utils-common",
  "jSkype/client",
  "jSkype/settings"
], function (e, t) {
  function o() {
    function u() {
      return i.get().signInManager._skypeToken();
    }
    var e = this, t = s.settings.messageSearchService, o = "{OPTION: {RESULTBASE: 0, RESULTCOUNT: %COUNT%}, QUERYSTRING: {Content: %CRITERIA%}}";
    e.query = function (e, i) {
      var s = {
        url: t.host + t.endpoints.query,
        headers: {
          "x-ms-correlation-id": r.create(),
          "X-Skypetoken": ""
        },
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: o.replace("%CRITERIA%", JSON.stringify(e)).replace("%COUNT%", i)
      };
      return u().then(function (e) {
        return s.headers["X-Skypetoken"] = e, Promise.resolve(n.compat(s));
      });
    };
  }
  var n = e("reqwest"), r = e("swx-utils-common").guid, i = e("jSkype/client"), s = e("jSkype/settings");
  t.build = function () {
    return new o();
  };
})
