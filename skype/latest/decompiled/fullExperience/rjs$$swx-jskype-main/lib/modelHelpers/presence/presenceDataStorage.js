(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/presence/presenceDataStorage", [
      "require",
      "exports",
      "lodash-compat",
      "./cache/local",
      "./cache/session"
    ], e);
}(function (e, t) {
  function s() {
    return r;
  }
  function o() {
    var e = i.restore();
    if (!n.isEmpty(e)) {
      var t = Object.keys(e).map(function (t) {
        return r.set(t, e[t]);
      });
      return Promise.all(t).then(function () {
        return u();
      });
    }
    return u();
  }
  function u() {
    return i.destroy(), r.restore();
  }
  var n = e("lodash-compat"), r = e("./cache/local"), i = e("./cache/session");
  t.getCache = s;
  t.restoreData = o;
}));
