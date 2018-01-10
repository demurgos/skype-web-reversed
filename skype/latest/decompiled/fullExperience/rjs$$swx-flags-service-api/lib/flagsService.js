(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-flags-service-api/lib/flagsService", [
      "require",
      "exports",
      "lodash-compat",
      "reqwest",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function u(e, t, n, r) {
    var s = i.getWindow();
    return {
      dataType: "json",
      method: e,
      url: r.replace(/\/$/, "") + "/" + n,
      crossOrigin: !0,
      headers: { "X-Skypetoken": s.encodeURIComponent(t) }
    };
  }
  function a(e, t, n, i) {
    return Promise.resolve(r.compat(u(e, t, n, i)));
  }
  function f(e) {
    return new o(e);
  }
  var n = e("lodash-compat"), r = e("reqwest"), i = e("swx-browser-globals"), s = 1000, o = function () {
      function e(e) {
        this.$unit = { _resetGlobalState: this._resetGlobalState.bind(this) };
        this.apiUrl = e;
        this._resetGlobalState();
      }
      return e.prototype.read = function (e, t) {
        return this.getAllFlags(t).then(function (t) {
          return n.includes(t, e);
        });
      }, e.prototype.update = function (e, t, n) {
        var r = i.getWindow();
        return a(t ? "PUT" : "DELETE", n, r.encodeURIComponent(e.toString()), this.apiUrl)["catch"](function (e) {
          if (e && e.status && e.status === 404)
            return;
          throw e;
        });
      }, e.prototype._resetGlobalState = function () {
        var e = this;
        this.getAllFlags = n.throttle(function (t) {
          return a("GET", t, "", e.apiUrl);
        }, s, { trailing: !1 });
      }, e;
    }();
  t.FlagsService = o;
  t.build = f;
}));
