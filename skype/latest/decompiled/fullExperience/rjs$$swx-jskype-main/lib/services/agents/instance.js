(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/agents/instance", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-browser-detect",
      "swx-client-info",
      "../serviceAccessLayer/decorations/reporting",
      "./telemetryDecorator",
      "swx-agents-web-service"
    ], e);
}(function (e, t) {
  function l() {
    var e = r.settings.agentProvisioningService, t, i;
    return f || (t = n.get().signInManager._skypeToken, i = c(), f = a.build(t, {
      host: e.host,
      decorations: [
        o,
        u
      ],
      countryCode: s.getCountryCode(),
      clientVersion: r.settings.uiVersion,
      hostSystemVersion: i,
      clientUILanguage: r.settings.initParams.locale
    })), f;
  }
  function c() {
    var e = i["default"].getSystemInfo(), t = e.osVersion, n = "0", r = "0", s = "";
    return t + "." + n + "." + r + "/" + s;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-browser-detect"), s = e("swx-client-info"), o = e("../serviceAccessLayer/decorations/reporting"), u = e("./telemetryDecorator"), a = e("swx-agents-web-service"), f;
  t.get = l;
}));
