(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/entitlement/entitlementOptionsBuilder", [
      "require",
      "exports",
      "lodash-compat",
      "swx-jskype-internal-application-instance",
      "jskype-constants",
      "./serviceSettings",
      "../serviceAccessLayer/transientFaultPolicy",
      "../optionsBuilder",
      "swx-client-info"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r = e("swx-jskype-internal-application-instance"), i = e("jskype-constants"), s = e("./serviceSettings"), o = e("../serviceAccessLayer/transientFaultPolicy"), u = e("../optionsBuilder"), a = e("swx-client-info"), f = function (e) {
      function t() {
        var t = e.call(this) || this;
        return t._options = {
          headers: {
            Accept: i.COMMON.contentTypes.JSON_V3_0,
            "X-Skype-Caller": a.getBIAppName(),
            "X-Skypetoken": ""
          },
          retry: n.merge({}, { isTransientCheck: o.isTransientFailure }, s.getRetryPolicy()),
          reporting: { serviceName: s.actions.getEntitlementService },
          addContentType: !1
        }, t;
      }
      return __extends(t, e), t.prototype.setHeader = function (e, t) {
        this._options.headers[e] = t;
      }, t.prototype.build = function () {
        var e = this;
        return r.get().signInManager._skypeToken().then(function (t) {
          return e.setHeader("X-Skypetoken", t), e._options;
        });
      }, t;
    }(u["default"]);
  t.__esModule = !0;
  t["default"] = f;
}));
