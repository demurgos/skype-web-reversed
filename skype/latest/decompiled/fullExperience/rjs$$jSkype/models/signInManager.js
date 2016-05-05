define("jSkype/models/signInManager", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jcafe-property-model",
  "jSkype/client",
  "swx-enums",
  "jSkype/modelHelpers/signIn/parameterBuilder",
  "jSkype/modelHelpers/signIn/skypeTokenManager",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/signIn/resignInHelper"
], function (e, t) {
  function l() {
    function c(r) {
      var i;
      return r && r.relink ? (f.startRelinkingFlow(), Promise.resolve()) : (e.state._set(s.loginState.SigningIn), t = u.build(r), i = n.get(), i.then(p), i);
    }
    function h() {
      return new Promise(function (t) {
        e.state._set(s.loginState.SigningOut), e.state.once(s.loginState.SignedOut, function () {
          o(!0), l(!1), y(!1), t(!0);
        });
      });
    }
    function p(t) {
      var n = a.extractSkypeIdFromToken(t);
      e.state._set(s.loginState.SignedIn), o(!1), l(!0), g(n), y(!0), b(n);
    }
    function d() {
      var e = n.get.bind(n);
      return e.changed = n.changed, e;
    }
    function v() {
      return e.state() !== s.loginState.SignedOut ? new Promise(function (e, n) {
        t.get().then(function (t) {
          m(t), e(t.token);
        }, function (e) {
          m(e), h(), n(e);
        });
      }) : Promise.reject("Not signed in");
    }
    function m(t) {
      t && (e._rpsToken(t.rpsToken), e._siteName(t.siteName));
    }
    function g(e) {
      i.get()._telemetryManager.setSkypeUserId(e);
    }
    function y(e) {
      e ? e = 1 : e = 0, i.get()._telemetryManager.setCommonProperty("signed_in", e);
    }
    function b(e) {
      e && e.indexOf("live:") === 0 && o(!0);
    }
    var e = this, t, n = r.property({ get: v }), o = r.boolProperty(!0), l = r.boolProperty(!1);
    e.state = r.property({
      readOnly: !0,
      value: s.loginState.SignedOut
    }), e.signIn = r.command(c, o), e.signOut = r.command(h, l), e._skypeToken = d(), e._rpsToken = r.property(), e._siteName = r.property();
  }
  var n = e("lodash-compat"), r = e("jcafe-property-model"), i = e("jSkype/client"), s = e("swx-enums"), o = e("jSkype/modelHelpers/signIn/parameterBuilder"), u = e("jSkype/modelHelpers/signIn/skypeTokenManager"), a = e("jSkype/modelHelpers/personsAndGroupsHelper"), f = e("jSkype/modelHelpers/signIn/resignInHelper");
  t.build = function () {
    return n.extend(new l(), o);
  };
})
