(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/signInManager", [
      "require",
      "exports",
      "lodash-compat",
      "jcafe-property-model",
      "swx-jskype-internal-application-instance",
      "swx-enums",
      "../modelHelpers/signIn/parameterBuilder",
      "../modelHelpers/signIn/skypeTokenManager",
      "../modelHelpers/personsAndGroupsHelper",
      "../modelHelpers/signIn/resignInHelper",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  function p(e) {
    i.get()._telemetryManager.setSkypeUserId(e);
  }
  function d(e) {
    var t = y(e);
    i.get()._telemetryManager.setCommonProperty("signed_in", t);
  }
  function v(e) {
    var t = y(g(e));
    i.get()._telemetryManager.setCommonProperty("technical_account", t);
  }
  function m() {
    var e = i.get().personsAndGroupsManager.mePerson, t = e.preferences(c.COMMON.userSettings.preferences.DARK_THEME), n = c.COMMON.telemetry.themeEvent;
    i.get()._telemetryManager.setCommonProperty(n.TYPE, n.theme.DEFAULT);
    if (!l.isFeatureOn(c.COMMON.featureFlags.DARK_THEME_ENABLED) || !t)
      return;
    t.value.get().then(function (e) {
      e && i.get()._telemetryManager.setCommonProperty(n.TYPE, n.theme.DARK);
    });
  }
  function g(e) {
    return e && e.indexOf("live:") === 0;
  }
  function y(e) {
    return e ? 1 : 0;
  }
  function b(e, t) {
    return n.extend(new h(e, t), o);
  }
  var n = e("lodash-compat"), r = e("jcafe-property-model"), i = e("swx-jskype-internal-application-instance"), s = e("swx-enums"), o = e("../modelHelpers/signIn/parameterBuilder"), u = e("../modelHelpers/signIn/skypeTokenManager"), a = e("../modelHelpers/personsAndGroupsHelper"), f = e("../modelHelpers/signIn/resignInHelper"), l = e("jskype-settings-instance"), c = e("swx-constants"), h = function () {
      function e(e, t) {
        function w(n) {
          if (n && n.relink)
            return f.startRelinkingFlow(e, t), Promise.resolve();
          i.state._set(s.loginState.SigningIn);
          b = u.build(n);
          var r = o.get();
          return r.then(x), r;
        }
        function E(e) {
          return i.context = e, new Promise(function (e) {
            i.state._set(s.loginState.SigningOut);
            y(!1);
            i.state.once(s.loginState.SignedOut, function () {
              l(!0);
              h(!1);
              d(!1);
              e(!0);
            });
          });
        }
        function S() {
          return y(!1), b.check().then(function () {
            y(!0);
          }, function (e) {
            return E({ reason: c.COMMON.api.auth.errorTypes.REAUTH_NEEDED }), Promise.reject({});
          });
        }
        function x(e) {
          var t = a.extractSkypeIdFromToken(e);
          i.state._set(s.loginState.SignedIn);
          l(!1);
          h(!0);
          p(t);
          d(!0);
          v(t);
          m();
          k(t);
          y(!0);
        }
        function T() {
          var e = o.get.bind(o);
          return e.changed = o.changed, e;
        }
        function N() {
          return i.state() !== s.loginState.SignedOut ? b.get().then(function (e) {
            return C(e), i._tokenExpiration = e.expiration, e.token;
          }, function (e) {
            return C(e), i._tokenExpiration = undefined, E(), Promise.reject(e);
          }) : Promise.reject("Not signed in");
        }
        function C(e) {
          e && (i._rpsToken(e.rpsToken), i._siteName(e.siteName));
        }
        function k(e) {
          g(e) && l(!0);
        }
        var n = this;
        this.state = r.property({
          readOnly: !0,
          value: s.loginState.SignedOut
        });
        this._rpsToken = r.property();
        this._siteName = r.property();
        this.getSignOutContext = function () {
          return n.context;
        };
        var i = this, o = r.property({ get: N }), l = r.boolProperty(!0), h = r.boolProperty(!1), y = r.boolProperty(!1), b;
        this.signIn = r.command(w, l);
        this.signOut = r.command(E, h);
        this.validateState = r.command(S, y);
        this._skypeToken = T();
      }
      return e;
    }();
  t.build = b;
}));
