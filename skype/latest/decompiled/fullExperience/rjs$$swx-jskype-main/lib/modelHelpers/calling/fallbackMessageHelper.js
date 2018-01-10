(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/calling/fallbackMessageHelper", [
      "require",
      "exports",
      "swx-enums",
      "swx-utils-chat"
    ], e);
}(function (e, t) {
  function i(e) {
    a(e, n.activityType.PluginFreeFallbackScreenSharing);
  }
  function s(e) {
    a(e, n.activityType.PluginFreeFallbackMicrophoneAccess);
  }
  function o(e) {
    a(e, n.activityType.PluginFreeNoVideoCapability);
  }
  function u(e) {
    a(e, n.activityType.PluginFreeVideoCompatibility);
  }
  function a(e, t) {
    var n = f(t);
    e.historyService._processRawMessage(n);
  }
  function f(e) {
    var t = r.dateTime.getDate();
    return {
      id: +t,
      timestamp: t,
      isOutgoing: !0,
      pluginFreeMessageType: e
    };
  }
  var n = e("swx-enums"), r = e("swx-utils-chat");
  t.sendScreenSharingFallbackMessage = i;
  t.sendMicrophoneAccessFallbackMessage = s;
  t.sendNoVideoCapabilityMessage = o;
  t.sendVideoCompatibilityMessage = u;
}));
