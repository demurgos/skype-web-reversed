(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/flagsServiceProvider", [
      "require",
      "exports",
      "swx-flags-service-api",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  function u(e) {
    return new o(e);
  }
  var n = e("swx-flags-service-api"), r = e("swx-jskype-internal-application-instance"), i = e("jskype-settings-instance");
  t.SYNC_INTERVAL = 60000;
  var s, o = function () {
      function e(t) {
        this.flagId = t;
        s || e._resetGlobalState();
      }
      return e._resetGlobalState = function () {
        s = n.build(i.settings.flagsApiUrl);
      }, e.prototype.read = function () {
        var e = this, t = Promise.resolve(r.get().signInManager._skypeToken());
        return t.then(function (t) {
          return s.read(e.flagId, t);
        });
      }, e.prototype.update = function (e) {
        var t = this, n = r.get().signInManager._skypeToken();
        return n.then(function (n) {
          return s.update(t.flagId, e, n);
        });
      }, e;
    }();
  o.$unit = { _resetGlobalState: o._resetGlobalState };
  t.FlagsServiceProvider = o;
  t.build = u;
}));
