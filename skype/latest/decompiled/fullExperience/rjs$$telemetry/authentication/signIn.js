define("telemetry/authentication/signIn", [
  "require",
  "exports",
  "module",
  "ui/telemetry/telemetryClient",
  "experience/settings",
  "swx-constants",
  "swx-utils-common",
  "utils/common/localStorage",
  "swx-browser-globals",
  "swx-utils-common",
  "telemetry/chat/sidebarReopenedEvent",
  "swx-service-locator-instance"
], function (e, t) {
  function h() {
    var e = a.get(i.storageKeys.AAD_TOKEN_EXPIRED);
    return e && a.remove(i.storageKeys.AAD_TOKEN_EXPIRED), e;
  }
  function p() {
    function t(t) {
      var i = "signIn", s = {};
      s.duration = e.duration();
      s.authType = t.authType;
      s.success = t.hasSucceed;
      s.hostname = location.hostname;
      s.retry = t.retry || !1;
      t.isExternalSignIn && (s.isExternalSignIn = t.isExternalSignIn);
      h() && (s.isExternalSignInAfterTokenRefresh = !0);
      t.hasSucceed || (s.error = t.error, s.jCafeStatus = t.jCafeStatus || "", t.details && (s.reason = t.details.reason || "", s.request = t.details.request || "", s.response = t.details.response || ""));
      t.flow && (s.flow = t.flow);
      n.get().sendEvent(r.telemetry.uiTenantToken, i, s);
      n.get().setAuthType && n.get().setAuthType(t.authType);
    }
    d();
    var e = s.build();
    return { send: t };
  }
  function d() {
    var e = i.telemetry.idleUsersAnalytics.localKeys.signInData, t = i.telemetry.idleUsersAnalytics.localKeys.sidebarActivity, n, r, s;
    try {
      s = o.get(e);
      n = s ? JSON.parse(s) : [];
      n.length >= 10 && n.splice(0, n.length - 9);
      n.push(new Date());
      o.set(e, JSON.stringify(n));
      s = o.get(t);
      r = s ? JSON.parse(s) : { sidebar: {} };
      r.sidebar.numberOfSignIns ? r.sidebar.numberOfSignIns = r.sidebar.numberOfSignIns + 1 : r.sidebar.numberOfSignIns = 1;
      o.set(t, JSON.stringify(r));
      v(r);
    } catch (u) {
    }
  }
  function v(e) {
    var t = l.resolve(i.serviceLocator.FEATURE_FLAGS);
    if (!t.isFeatureOn(i.featureFlags.REOPEN_SIDEBAR))
      return;
    if (!e.sidebar.state || e.sidebar.state !== "opened")
      return;
    var n = u.getWindow(), r = function () {
        try {
          n.$ToggleSidebar && (n.$ToggleSidebar(), f.build().publishReopen());
        } catch (e) {
        }
      };
    n.$Do && n.$Do.when && n.$ToggleSidebar ? n.$Do.when("$WLXIM.SidebarCreated", 0, r) : n.setTimeout(r, c);
  }
  var n = e("ui/telemetry/telemetryClient"), r = e("experience/settings"), i = e("swx-constants").COMMON, s = e("swx-utils-common").stopwatch, o = e("utils/common/localStorage"), u = e("swx-browser-globals"), a = e("swx-utils-common").sessionStorage, f = e("telemetry/chat/sidebarReopenedEvent"), l = e("swx-service-locator-instance").default, c = 500;
  t.build = function () {
    return new p();
  };
});
