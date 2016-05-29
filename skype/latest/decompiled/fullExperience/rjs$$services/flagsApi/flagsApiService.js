define("services/flagsApi/flagsApiService", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "reqwest",
  "experience/settings",
  "browser/window"
], function (e, t) {
  function o() {
    this.getAll = function () {
      function e(e) {
        var t = a(e, "GET");
        return r.compat(t);
      }
      function t() {
        return Promise.reject();
      }
      return u().then(e, t);
    };
    this.set = function (e) {
      function t(t) {
        var i = a(t, "PUT", e);
        return r.compat(i).then(function (e) {
          return e.status === 201 ? Promise.resolve() : n();
        });
      }
      function n() {
        return Promise.reject();
      }
      return u().then(t).catch(n);
    };
  }
  function u() {
    return n.get().signInManager._skypeToken();
  }
  function a(e, t, n) {
    var r = {
      url: i.flagsApiUrl,
      dataType: "json",
      crossOrigin: !0,
      headers: { "X-Skypetoken": e }
    };
    return t && (r.method = t), n && (r.url += "/" + s.encodeURIComponent(n)), r;
  }
  var n = e("cafe/applicationInstance"), r = e("reqwest"), i = e("experience/settings"), s = e("browser/window");
  t.build = function () {
    return new o();
  };
});
