define("telemetry/usage/inAppActivityTracker", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "swx-constants",
  "browser/document",
  "experience/settings",
  "utils/common/localStorage",
  "ui/telemetry/telemetryClient",
  "swx-cafe-application-instance",
  "telemetry/chat/sidebarReopenedEvent",
  "browser/window",
  "swx-mri"
], function (e, t) {
  function y() {
    var e = i.getElementsByClassName(r.experience.RENDERER_CLASS);
    for (var t = e.length - 1; t >= 0; --t)
      if (e[t].getBoundingClientRect().width !== 0)
        return !0;
    return !1;
  }
  function b() {
    var e = o.get(h.APP_FOCUSED_TIME_KEY), t = o.get(h.APP_CLOSED_TIME_KEY), n = o.get(h.SIGNED_IN_TIME_KEY);
    n && t ? w(parseInt(n, 10), parseInt(t, 10), h.APP_EXIT_POINT_REASON.APP_CLOSED, h.APP_ENTRY_POINT_REASON.APP_OPENED) : e && t && w(parseInt(e, 10), parseInt(t, 10), h.APP_EXIT_POINT_REASON.APP_CLOSED, h.APP_ENTRY_POINT_REASON.APP_FOREGROUNDED);
    o.remove(h.APP_FOCUSED_TIME_KEY);
    o.remove(h.APP_CLOSED_TIME_KEY);
    o.remove(h.SIGNED_IN_TIME_KEY);
  }
  function w(e, t, n, i) {
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
  function E(e, t) {
    var n = a.get().personsAndGroupsManager.mePerson, i = r.telemetry.inappActivity.KPI_INAPP_ACTIVITY_START, o = {
        Entry_Point: t,
        Foreground_Start_Time: e.toString(),
        GuestFlow: c.isGuestId(n.id())
      };
    u.get().sendEvent(s.telemetry.uiTenantToken, i, o);
  }
  function S() {
    o.set(h.APP_CLOSED_TIME_KEY, new Date().getTime());
  }
  function x() {
    d || (d = setInterval(S, h.INTERVAL_30_SECONDS));
  }
  function T() {
    d && (d = clearInterval(d));
  }
  function N() {
    y() ? p || C() : (o.remove(h.APP_FOCUSED_TIME_KEY), T());
  }
  function C() {
    if (!g)
      return;
    O(!0);
    var e = new Date().getTime();
    o.set(h.APP_FOCUSED_TIME_KEY, e);
    E(e, h.APP_ENTRY_POINT_REASON.APP_FOREGROUNDED);
    x();
    M();
    p = !0;
  }
  function k() {
    if (!g)
      return;
    y() || (O(!1), f.build().publishCloseTimeout(!0));
    var e = o.get(h.APP_FOCUSED_TIME_KEY), t = o.get(h.SIGNED_IN_TIME_KEY), n = new Date().getTime();
    t ? (w(parseInt(t, 10), n, h.APP_EXIT_POINT_REASON.APP_BACKGROUNDED, h.APP_ENTRY_POINT_REASON.APP_OPENED), o.remove(h.SIGNED_IN_TIME_KEY)) : e && (w(parseInt(e, 10), n, h.APP_EXIT_POINT_REASON.APP_BACKGROUNDED, h.APP_ENTRY_POINT_REASON.APP_FOREGROUNDED), o.remove(h.APP_FOCUSED_TIME_KEY));
    T();
    _();
    p = !1;
  }
  function L() {
    m || (m = setTimeout(function () {
      var e = y() && i.hasFocus();
      e && !p ? C() : !e && p && k();
      m = null;
    }, h.TIMEOUT_1_SECOND));
  }
  function A(e) {
    if (e === n.loginState.SignedIn) {
      g = !0;
      if (y() && i.hasFocus()) {
        var t = new Date().getTime();
        o.set(h.SIGNED_IN_TIME_KEY, t);
        E(t, h.APP_ENTRY_POINT_REASON.APP_OPENED);
        x();
        M();
        p = !0;
      }
    }
  }
  function O(e) {
    var t, n = r.telemetry.idleUsersAnalytics.localKeys.sidebarActivity, i, s = new Date();
    try {
      t = o.get(n);
      i = t ? JSON.parse(t) : { sidebar: { numberOfSignIns: 1 } };
      i.sidebar.timestamp = s;
      i.sidebar.state = e ? "opened" : "closed";
      e && (i.sidebar.lastTimeOpened = s, i.sidebar.numberOfSignIns = 0);
      o.set(n, JSON.stringify(i));
    } catch (u) {
    }
  }
  function M() {
    v || (v = setInterval(D, h.ENDPOINT_ACTIVATION_TIMEOUT));
  }
  function _() {
    v && (v = clearInterval(v));
  }
  function D() {
    if (!i.hasFocus() || !y()) {
      _();
      return;
    }
    a.get().isEndpointActive && a.get().isEndpointActive.set(!0);
  }
  var n = e("swx-enums"), r = e("swx-constants").COMMON, i = e("browser/document"), s = e("experience/settings"), o = e("utils/common/localStorage"), u = e("ui/telemetry/telemetryClient"), a = e("swx-cafe-application-instance"), f = e("telemetry/chat/sidebarReopenedEvent"), l = e("browser/window"), c = e("swx-mri"), h = {
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
      INTERVAL_30_SECONDS: 30000,
      ENDPOINT_ACTIVATION_TIMEOUT: 11000
    }, p, d, v, m, g;
  t.init = function (e) {
    g = !1;
    p = !1;
    b();
    e.state.changed(A);
    l.addEventListener(r.events.browser.FOCUS, N);
    l.addEventListener(r.events.browser.BLUR, k);
    l.addEventListener(r.events.browser.CLICK, L);
    l.addEventListener(r.events.browser.BEFOREUNLOAD, function () {
      o.set(h.APP_CLOSED_TIME_KEY, new Date().getTime());
      return;
    });
  };
  t.inappActivityConstants = h;
  t.isClientVisible = y;
});
