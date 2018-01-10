(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/contacts/optionsBuilder", [
      "require",
      "exports",
      "lodash-compat",
      "../optionsBuilder",
      "./serviceSettings",
      "swx-client-info"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r = e("../optionsBuilder"), i = e("./serviceSettings"), s = e("swx-client-info"), o = function (e) {
      function t() {
        var t = e.call(this) || this;
        return n.merge(t._defaultOptions.retry, i.getRetryPolicy()), n.merge(t._defaultOptions.headers, { "X-Skype-Caller": s.getBIAppName() }), t;
      }
      return __extends(t, e), t;
    }(r["default"]);
  t.__esModule = !0;
  t["default"] = o;
}));
