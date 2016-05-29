define("jSkype/services/trouter/registrar", [
  "require",
  "exports",
  "module",
  "browser/window",
  "lodash-compat",
  "swx-utils-common",
  "jSkype/services/trouter/requestBuilder",
  "jSkype/settings"
], function (e, t) {
  function u(e, t, u) {
    function m() {
      return s.registerPresence(f, p, e).then(y, b);
    }
    function g() {
      return c = !0, m();
    }
    function y(e) {
      var n = e.response;
      if (!a(n.status)) {
        b(n);
        return;
      }
      w();
      t && t(c);
    }
    function b(e) {
      u && u(e);
    }
    function w() {
      clearTimeout(l);
      h.duration() + d < v && (l = r.delay(g, d));
    }
    function E() {
      n.clearTimeout(l);
    }
    var f, l, c = !1, h, p = o.settings.incomingCalls.registrarTtlInSeconds, d = o.settings.incomingCalls.registrarRefreshTimeoutInMs, v = o.settings.incomingCalls.maxRegistrationTimeInMs;
    return {
      registerPresence: function (e) {
        return c = !1, f = e, h = i.build(), E(), m();
      }
    };
  }
  function a(e) {
    return e === 202 || e === 200;
  }
  var n = e("browser/window"), r = e("lodash-compat"), i = e("swx-utils-common").stopwatch, s = e("jSkype/services/trouter/requestBuilder"), o = e("jSkype/settings");
  t.build = function (e, t, n) {
    return new u(e, t, n);
  };
});
