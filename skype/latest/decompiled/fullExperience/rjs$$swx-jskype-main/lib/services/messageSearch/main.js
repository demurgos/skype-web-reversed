(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/messageSearch/main", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "reqwest",
      "swx-utils-common",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  function u() {
    return new o();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("reqwest"), i = e("swx-utils-common"), s = e("jskype-settings-instance"), o = function () {
      function e() {
        var e = this;
        this.serviceSettings = s.settings.messageSearchService;
        this.queryPattern = "{OPTION: {RESULTBASE: 0, RESULTCOUNT: %COUNT%}, QUERYSTRING: {Content: %CRITERIA%}}";
        this.query = function (t, n) {
          var s = {
            url: e.serviceSettings.host + e.serviceSettings.endpoints.query,
            headers: {
              "x-ms-correlation-id": i.guid.create(),
              "X-Skypetoken": ""
            },
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: e.queryPattern.replace("%CRITERIA%", JSON.stringify(t)).replace("%COUNT%", n.toString())
          };
          return e.setupToken().then(function (e) {
            return s.headers["X-Skypetoken"] = e, Promise.resolve(r.compat(s));
          });
        };
      }
      return e.prototype.setupToken = function () {
        return n.get().signInManager._skypeToken();
      }, e;
    }();
  t.build = u;
}));
