define("jSkype/modelHelpers/signIn/skypeTokenManager", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "jSkype/modelHelpers/signIn/handlers",
  "swx-enums"
], function (e, t) {
  function o(e) {
    function a() {
      return t && !f() ? l() : p();
    }
    function f() {
      return o === i.authType.ImplicitOAuth ? Date.now() >= t.getExpiryTime() - s : !1;
    }
    function l() {
      var e = {};
      return e.token = t.getToken ? t.getToken() : undefined, o === i.authType.ImplicitOAuth && (e.rpsToken = t.getRpsToken(), e.siteName = t.getSiteName()), e;
    }
    function c(e) {
      d(e), this.resolve(l());
    }
    function h(e) {
      this.reject(e);
    }
    function p() {
      var t = r[o], i = n.task();
      return o && t ? t(e).then(c.bind(i), h.bind(i)) : i.reject("Unknown sign in parameters"), i.promise;
    }
    function d(e) {
      e && (t = e);
    }
    e = e || {};
    var t, o = e.type || null, u = n.property({ get: a });
    return { get: u.get.bind(u) };
  }
  var n = e("jcafe-property-model"), r = e("jSkype/modelHelpers/signIn/handlers"), i = e("swx-enums"), s = 600000;
  t.build = function (e) {
    return new o(e);
  };
})
