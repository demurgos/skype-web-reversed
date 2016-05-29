define("ui/shortCircuit/shortCircuit", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "browser/window",
  "constants/common",
  "swx-enums",
  "ui/session/localSession",
  "cafe/applicationInstance",
  "services/serviceLocator",
  "telemetry/shortCircuit/shortCircuit"
], function (e, t) {
  function y() {
    function t(e) {
      return new Promise(function (t) {
        function r() {
          e.closed && (clearInterval(n), t());
        }
        var n;
        n = setInterval(r, 1000);
      });
    }
    function y(e, t, n) {
      return w() + S(t, n) + "#" + T(e);
    }
    function b(e, t) {
      return r.open(t || "", e, "width=" + c + ",height=" + h + ",scrollbars,status");
    }
    function w() {
      var e = [];
      return e.push(n.pnvService.host), e.push(n.pnvService.pnvEndpoint), e.push("?"), e.join("");
    }
    function E() {
      var e = [];
      return e.push(n.pnvService.host), e.push(n.pnvService.finishEndpoint), e.join("");
    }
    function S(e, t) {
      var r = [];
      return r.push("client_id=" + n.pnvService.clientId), r.push("redirect_uri=" + E()), r.push("response_type=" + d), r.push("partner=" + p), r.push("setlang=" + n.initParams.locale), r.push("clientVersion=" + n.uiVersion), r.push("scenario=" + (t || x(e))), r.push("session_id=" + o.getSessionId()), r.join("&");
    }
    function x(e) {
      return Date.now() - +e < v ? m : g;
    }
    function T(e) {
      var t = [];
      return t.push("Skypetoken=" + e), t.join("&");
    }
    var e = this;
    e.open = function (e) {
      var n, r = f.build(), i = u.get(), s = l + +Date.now(), o = b(s);
      return r.sendStartEvent(), n = t(o), n.then(function () {
        r.sendFinishedEvent();
      }), i.signInManager._skypeToken().then(function (t) {
        return i.personsAndGroupsManager.mePerson._registeredAt.get().then(function (r) {
          return b(s, y(t, r, e)), n;
        });
      }).catch(function () {
        return o.close(), n;
      });
    };
    e.isEnabled = function () {
      var e = u.get().personsAndGroupsManager.mePerson, t = a.resolve(i.serviceLocator.FEATURE_FLAGS), n = t.isFeatureOn(i.featureFlags.SHORT_CIRCUIT);
      return !n || e._settings === undefined || e._registeredAt === undefined ? Promise.resolve(!1) : e._settings.get(s.selfSettings.linkedMSA).then(function (t) {
        return t ? e._settings.get(s.selfSettings.autoBuddy).then(function (e) {
          return !e;
        }) : !1;
      });
    };
  }
  var n = e("experience/settings"), r = e("browser/window"), i = e("constants/common"), s = e("swx-enums"), o = e("ui/session/localSession"), u = e("cafe/applicationInstance"), a = e("services/serviceLocator"), f = e("telemetry/shortCircuit/shortCircuit"), l = "Skype.ShortCircuit", c = 720, h = 472, p = 999, d = "postmessage", v = 3600000, m = "signup", g = "afterlogin";
  t.build = function () {
    return new y();
  };
});
