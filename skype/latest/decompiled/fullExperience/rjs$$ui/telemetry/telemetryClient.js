define("ui/telemetry/telemetryClient", [
  "require",
  "exports",
  "module",
  "telemetry/manager/telemetryManager",
  "experience/settings",
  "browser/window",
  "ui/session/localSession",
  "browser/detect"
], function (e, t) {
  function u(e) {
    m(e, "session_id", i.getSessionId());
    m(e, "tab_session_id", i.getTabSessionId());
  }
  function a(e) {
    var t = s.getBrowserInfo();
    e.setCommonProperty("user_agent_name", t.browserName);
    e.setCommonProperty("user_agent_version", t.browserMajorVersion);
  }
  function f(e) {
    var t = s.getSystemInfo();
    e.setCommonProperty("user_agent_OS", t.osName);
    e.setCommonProperty("user_agent_OS_version", t.osVersion);
    e.setCommonProperty("device_type", t.deviceType);
  }
  function l(e) {
    var t = s.getScreenInfo();
    e.setCommonProperty("screen_width", t.width);
    e.setCommonProperty("screen_height", t.height);
  }
  function c(e) {
    n.eTag && e.setCommonProperty("etag", n.eTag);
    n.configIds && n.configIds.length > 0 && e.setCommonProperty("cfg_ids", n.configIds + "");
  }
  function h(e) {
    return n.telemetry.upnCorrelationIdEnabled ? -1 : e.indexOf("upn");
  }
  function p(e) {
    var t = 0, r = 128, i = 10, s = -1, o = [];
    if (!n.initParams || !n.initParams.correlationIds)
      return;
    o = Object.keys(n.initParams.correlationIds);
    s = h(o);
    s > -1 && o.splice(s, 1);
    o.forEach(function (s) {
      t++;
      var o = n.initParams.correlationIds[s];
      o && o !== "" && o.length <= r && t <= i && e.setCommonProperty("cid_" + s, o);
    });
  }
  function d(e) {
    n.initParams && (m(e, "environment_id", n.initParams.environment), m(e, "api_key", n.initParams.apiKey), m(e, "locale", n.initParams.locale));
    e.setCommonProperty("ui_version", n.uiVersion);
    e.setCommonProperty("version", n.version);
    e.setCommonProperty("property", n.biAppName);
    e.setCommonProperty("Client_Name", n.biClientName);
  }
  function v(e) {
    if (!n.telemetry.selectedTargets)
      return;
    for (var t = 0; t < n.telemetry.selectedTargets.length; t++) {
      var i = new RegExp(n.telemetry.selectedTargets[t]);
      if (i.test(r.location.hostname)) {
        e.setCommonProperty("selected_target", !0);
        break;
      }
    }
  }
  function m(e, t, n) {
    if (!n)
      return;
    e.setCommonProperty(t, n);
  }
  function g(e) {
    e.setAppProperties(n.version);
    u(e);
    a(e);
    f(e);
    l(e);
    p(e);
    d(e);
    c(e);
    v(e);
  }
  e("telemetry/manager/telemetryManager");
  var n = e("experience/settings"), r = e("browser/window"), i = e("ui/session/localSession"), s = e("browser/detect"), o;
  t.reset = function () {
    o = null;
  };
  t.get = function () {
    return o || (o = r.skypeTelemetryManager.create(), g(o)), o;
  };
});
