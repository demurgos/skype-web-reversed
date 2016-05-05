define("telemetry/usage/inAppActivityTracker", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "constants/common",
  "browser/document",
  "experience/settings",
  "utils/common/localStorage",
  "ui/telemetry/telemetryClient",
  "browser/window"
], function (e, t) {
  function p() {
    var e = i.getElementsByClassName(r.experience.RENDERER_CLASS);
    for (var t = e.length - 1; t >= 0; --t)
      if (e[t].getBoundingClientRect().width !== 0)
        return !0;
    return !1;
  }
  function d() {
    var e = o.get(f.APP_FOCUSED_TIME_KEY), t = o.get(f.APP_CLOSED_TIME_KEY), n = o.get(f.SIGNED_IN_TIME_KEY);
    n && t ? v(parseInt(n, 10), parseInt(t, 10), f.APP_EXIT_POINT_REASON.APP_CLOSED, f.APP_ENTRY_POINT_REASON.APP_OPENED) : e && t && v(parseInt(e, 10), parseInt(t, 10), f.APP_EXIT_POINT_REASON.APP_CLOSED, f.APP_ENTRY_POINT_REASON.APP_FOREGROUNDED), o.remove(f.APP_FOCUSED_TIME_KEY), o.remove(f.APP_CLOSED_TIME_KEY), o.remove(f.SIGNED_IN_TIME_KEY);
  }
  function v(e, t, n, i) {
    var o = (t - e) / 1000, a = r.telemetry.inappActivity.KPI_INAPP_ACTIVITY_END, f = {
        Entry_Point: i,
        Exit_Point: n,
        Foreground_Start_Time: e.toString(),
        Foregrounded_Duration: o.toString()
      };
    if (o <= 0)
      return;
    u.get().sendEvent(s.telemetry.uiTenantToken, a, f);
  }
  function m(e, t) {
    var n = r.telemetry.inappActivity.KPI_INAPP_ACTIVITY_START, i = {
        Entry_Point: t,
        Foreground_Start_Time: e.toString()
      };
    u.get().sendEvent(s.telemetry.uiTenantToken, n, i);
  }
  function g() {
    o.set(f.APP_CLOSED_TIME_KEY, new Date().getTime());
  }
  function y() {
    c || (c = setInterval(g, f.INTERVAL_30_SECONDS));
  }
  function b() {
    c && (c = clearInterval(c));
  }
  function w() {
    p() ? l || E() : (o.remove(f.APP_FOCUSED_TIME_KEY), b());
  }
  function E() {
    if (!h)
      return;
    var e = new Date().getTime();
    o.set(f.APP_FOCUSED_TIME_KEY, e), m(e, f.APP_ENTRY_POINT_REASON.APP_FOREGROUNDED), y(), l = !0;
  }
  function S() {
    if (!h)
      return;
    var e = o.get(f.APP_FOCUSED_TIME_KEY), t = o.get(f.SIGNED_IN_TIME_KEY), n = new Date().getTime();
    t ? (v(parseInt(t, 10), n, f.APP_EXIT_POINT_REASON.APP_BACKGROUNDED, f.APP_ENTRY_POINT_REASON.APP_OPENED), o.remove(f.SIGNED_IN_TIME_KEY)) : e && (v(parseInt(e, 10), n, f.APP_EXIT_POINT_REASON.APP_BACKGROUNDED, f.APP_ENTRY_POINT_REASON.APP_FOREGROUNDED), o.remove(f.APP_FOCUSED_TIME_KEY)), b(), l = !1;
  }
  function x() {
    setTimeout(function () {
      var e = p() && i.hasFocus();
      e && !l ? E() : !e && l && S();
    }, f.TIMEOUT_1_SECOND);
  }
  function T(e) {
    if (e === n.loginState.SignedIn) {
      h = !0;
      if (p() && i.hasFocus()) {
        var t = new Date().getTime();
        o.set(f.SIGNED_IN_TIME_KEY, t), m(t, f.APP_ENTRY_POINT_REASON.APP_OPENED), y(), l = !0;
      }
    }
  }
  var n = e("swx-enums"), r = e("constants/common"), i = e("browser/document"), s = e("experience/settings"), o = e("utils/common/localStorage"), u = e("ui/telemetry/telemetryClient"), a = e("browser/window"), f = {
      APP_FOCUSED_TIME_KEY: "swx|AppFocusedTimeMs",
      APP_CLOSED_TIME_KEY: "swx|appClosedTimeMs",
      SIGNED_IN_TIME_KEY: "swx|SingedInTimeMs",
      APP_ENTRY_POINT_REASON: {
        APP_OPENED: "Opened",
        APP_FOREGROUNDED: "Foregrounded"
      },
      APP_EXIT_POINT_REASON: {
        APP_CLOSED: "Closed",
        APP_BACKGROUNDED: "Backgrounded"
      },
      TIMEOUT_1_SECOND: 1000,
      INTERVAL_30_SECONDS: 30000
    }, l, c, h;
  t.init = function (e) {
    h = !1, l = !1, d(), e.state.changed(T), a.addEventListener(r.events.browser.FOCUS, w), a.addEventListener(r.events.browser.BLUR, S), a.addEventListener(r.events.browser.CLICK, x), a.addEventListener(r.events.browser.BEFOREUNLOAD, function () {
      o.set(f.APP_CLOSED_TIME_KEY, new Date().getTime());
      return;
    });
  }, t.inappActivityConstants = f;
})
