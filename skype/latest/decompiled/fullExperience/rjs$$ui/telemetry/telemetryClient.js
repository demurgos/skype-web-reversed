define("ui/telemetry/telemetryClient", [
  "require",
  "exports",
  "module",
  "telemetry/manager/telemetryManager",
  "experience/settings",
  "swx-browser-globals",
  "ui/session/localSession",
  "swx-browser-detect",
  "swx-constants/lib/common",
  "swx-service-locator-instance"
], function (e, t) {
  function f(e) {
    w(e, "session_id", i.getSessionId());
    w(e, "tab_session_id", i.getTabSessionId());
  }
  function l(e) {
    var t = s.getBrowserInfo();
    e.setCommonProperty("user_agent_name", t.browserName);
    e.setCommonProperty("user_agent_version", t.browserMajorVersion);
  }
  function c(e) {
    var t = s.getSystemInfo();
    e.setCommonProperty("user_agent_OS", t.osName);
    e.setCommonProperty("user_agent_OS_version", t.osVersion);
    e.setCommonProperty("device_type", t.deviceType);
  }
  function h(e) {
    var t = s.getScreenInfo();
    e.setCommonProperty("screen_width", t.width);
    e.setCommonProperty("screen_height", t.height);
  }
  function p(e) {
    n.eTag && e.setCommonProperty("etag", n.eTag);
    n.configIds && n.configIds.length > 0 && e.setCommonProperty("cfg_ids", n.configIds + "");
  }
  function d(e) {
    return n.telemetry.upnCorrelationIdEnabled ? -1 : e.indexOf("upn");
  }
  function v(e) {
    var t = 0, r = 128, i = 10, s = -1, o = [];
    if (!n.initParams || !n.initParams.correlationIds)
      return;
    o = Object.keys(n.initParams.correlationIds);
    s = d(o);
    s > -1 && o.splice(s, 1);
    o.forEach(function (s) {
      t++;
      var o = n.initParams.correlationIds[s];
      o && o !== "" && o.length <= r && t <= i && e.setCommonProperty("cid_" + s, o);
    });
  }
  function m(e) {
    n.initParams && (w(e, "environment_id", n.initParams.environment), w(e, "api_key", n.initParams.apiKey), w(e, "locale", n.initParams.locale));
    e.setCommonProperty("ui_version", n.uiVersion);
    e.setCommonProperty("version", n.version);
    e.setCommonProperty("property", n.biAppName);
    e.setCommonProperty("Client_Name", n.biClientName);
  }
  function g(e) {
    var t;
    if (!n.telemetry.selectedTargets)
      return;
    t = r.getWindow().location.hostname;
    for (var i = 0; i < n.telemetry.selectedTargets.length; i++) {
      var s = new RegExp(n.telemetry.selectedTargets[i]);
      if (s.test(t)) {
        e.setCommonProperty("selected_target", !0);
        break;
      }
    }
  }
  function y(e) {
    function t() {
      var e = r.getWindow().Notification;
      return e && e.permission === "granted" ? !0 : !1;
    }
    e.setCommonProperty("browser_notifications_enabled", t);
  }
  function b(e) {
    var t = u.resolve(o.serviceLocator.FEATURE_FLAGS);
    if (t.isFeatureOn(o.featureFlags.TELEMETRY_CAPTURE_SOURCE_ENABLED)) {
      var n = s.getBrowserInfo().getUrlParams(), r = n && n.source && n.source.length <= 20 && n.source.match(/^[a-z0-9]+$/i);
      r && e.setCommonProperty("source", n.source.toLowerCase());
    }
  }
  function w(e, t, n) {
    if (!n)
      return;
    e.setCommonProperty(t, n);
  }
  function E(e) {
    e.setAppProperties(n.version);
    f(e);
    l(e);
    c(e);
    h(e);
    v(e);
    m(e);
    p(e);
    g(e);
    y(e);
    b(e);
  }
  e("telemetry/manager/telemetryManager");
  var n = e("experience/settings"), r = e("swx-browser-globals"), i = e("ui/session/localSession"), s = e("swx-browser-detect").default, o = e("swx-constants/lib/common").default, u = e("swx-service-locator-instance").default, a;
  t.reset = function () {
    a = null;
  };
  t.get = function () {
    return a || (a = r.getWindow().skypeTelemetryManager.create(), E(a)), a;
  };
});
