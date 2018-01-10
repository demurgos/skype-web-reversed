define("services/telemetry/skypeData", [
  "require",
  "exports",
  "module",
  "swx-log-tracer",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function s(e, t) {
    var n, r = {}, i = /([A-Z])/g;
    for (n in e.contextIds)
      if (e.contextIds.hasOwnProperty(n)) {
        var s = n.replace(i, "_$1");
        o(t, s.toLowerCase(), e.contextIds[n]);
      }
    return r;
  }
  function o(e, t, n) {
    var r = typeof n == "string" ? n : String(n);
    e[t] = r;
  }
  function u(e, t, n, r) {
    typeof r == "object" ? Object.keys(r).forEach(function (i) {
      u(e, t, n + "_" + i, r[i]);
    }) : o(e, n, r);
  }
  function a(e, t) {
    var n = e.data || {}, r = {};
    Object.keys(n).forEach(function (e) {
      u(t, r, e, n[e]);
    });
  }
  function f(e) {
    return e.type ? e.data ? !0 : (n.warn("Event " + e.type + " has an empty data payload. This is going to be ignored"), !1) : (n.warn("An event was sent with no type defined. This is going to be ignored"), !1);
  }
  function l(e) {
    var t = {};
    return a(e, t), s(e, t), t;
  }
  var n = e("swx-log-tracer").getLogger(), r = e("experience/settings"), i = e("ui/telemetry/telemetryClient");
  t.push = function (e, t) {
    if (!f(e))
      return;
    t || (t = r.telemetry.uiTenantToken);
    var n = l(e);
    i.get().sendEvent(t, e.type, n);
  };
});
