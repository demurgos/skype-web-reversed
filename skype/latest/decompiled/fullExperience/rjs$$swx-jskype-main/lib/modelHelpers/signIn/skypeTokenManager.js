(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/signIn/skypeTokenManager", [
      "require",
      "exports",
      "jcafe-property-model",
      "./handlers",
      "swx-enums",
      "../../telemetry/people/skypeTokenFetched",
      "../../services/electron"
    ], e);
}(function (e, t) {
  function h(e) {
    return new c(e);
  }
  var n = e("jcafe-property-model"), r = e("./handlers"), i = e("swx-enums"), s = e("../../telemetry/people/skypeTokenFetched"), o = e("../../services/electron"), u = 600000, a = !0, f = !1, l, c = function () {
      function e(e) {
        function p() {
          return t && !v() ? m() : b(c);
        }
        function d() {
          return o.isRefreshAuthenticationAvailable() ? o.refreshAuthentication() : (l = s["default"].updateIfNeeded(l), l.reauth = !0, b(i.authType.ImplicitOAuth));
        }
        function v() {
          return c === i.authType.ImplicitOAuth ? Date.now() >= t.getExpiryTime() - u : !1;
        }
        function m() {
          var e = {
            token: t.getToken ? t.getToken() : undefined,
            expiration: t.getExpiryTime ? t.getExpiryTime() : undefined
          };
          return c === i.authType.ImplicitOAuth && (e.rpsToken = t.getRpsToken(), e.siteName = t.getSiteName()), e;
        }
        function g(e) {
          w(e);
          this.resolve(m());
          l.publish(c, a, e.getRetryCount && e.getRetryCount());
        }
        function y(e) {
          this.reject(e);
          e = e || {};
          l.publish(c, f, e.retryCount, e.error);
        }
        function b(t) {
          var i = r[t], o = n.task();
          return t && i ? (l = s["default"].updateIfNeeded(l), i(e).then(g.bind(o), y.bind(o))) : o.reject("Unknown sign in parameters"), o.promise;
        }
        function w(e) {
          e && (t = e);
        }
        e = e || {};
        var t, c = e.type || null, h = n.property({ get: p });
        this.get = h.get.bind(h);
        this.check = d;
      }
      return e;
    }();
  t.build = h;
}));
