(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-people/lib/avatar/cache", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r = "404Avatar", i = function () {
      function e(e, t, n) {
        this.cacheInstanceProvider = e;
        this.settings = t;
        this.dateTime = n;
      }
      return e.prototype.add = function (e) {
        var t = this, n = this.cacheInstanceProvider.get();
        return n.getItem(r).then(function (i) {
          if (!i || !Array.isArray(i))
            i = [];
          return i.push({
            src: e,
            expiresAt: t.dateTime.now() + t.settings.avatarCacheDuration
          }), n.setItem(r, i);
        });
      }, e.prototype.isCached = function (e) {
        var t = this, i = this.cacheInstanceProvider.get();
        return e ? i.getItem(r).then(function (s) {
          var o = n.find(s, { src: e });
          return o ? o.expiresAt < t.dateTime.now() ? (n.remove(s, { src: e }), i.setItem(r, s).then(function () {
            return Promise.resolve(!1);
          })) : Promise.resolve(!0) : Promise.resolve(!1);
        }) : Promise.resolve(!1);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
