define("services/telemetry/skypeData", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function i(e, t) {
    var n, r = {}, i = /([A-Z])/g;
    for (n in e.contextIds)
      if (e.contextIds.hasOwnProperty(n)) {
        var o = n.replace(i, "_$1");
        s(t, o.toLowerCase(), e.contextIds[n]);
      }
    return r;
  }
  function s(e, t, n) {
    var r = typeof n == "string" ? n : String(n);
    e[t] = r;
  }
  function o(e, t, n, r) {
    typeof r == "object" ? Object.keys(r).forEach(function (i) {
      o(e, t, n + "_" + i, r[i]);
    }) : s(e, n, r);
  }
  function u(e, t) {
    var n = e.data || {}, r = {};
    Object.keys(n).forEach(function (e) {
      o(t, r, e, n[e]);
    });
  }
  function a(e) {
    return e.type ? e.data ? !0 : !1 : !1;
  }
  function f(e) {
    var t = {};
    return u(e, t), i(e, t), t;
  }
  var n = e("experience/settings"), r = e("ui/telemetry/telemetryClient");
  t.push = function (e) {
    if (!a(e))
      return;
    var t = f(e);
    r.get().sendEvent(n.telemetry.uiTenantToken, e.type, t);
  };
})
