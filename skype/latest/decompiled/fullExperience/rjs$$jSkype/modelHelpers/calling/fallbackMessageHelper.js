define("jSkype/modelHelpers/calling/fallbackMessageHelper", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "utils/chat/dateTime"
], function (e, t) {
  function i(e, t) {
    var n = s(t);
    e.historyService._processRawMessage(n);
  }
  function s(e) {
    var t = r.getDate();
    return {
      id: +t,
      timestamp: t,
      isOutgoing: !0,
      pluginFreeMessageType: e
    };
  }
  var n = e("swx-enums").activityType, r = e("utils/chat/dateTime");
  t.sendWindowsUpdateFallbackMessage = function (e) {
    i(e, n.PluginFreeFallbackWindowsUpdate);
  };
  t.sendScreenSharingFallbackMessage = function (e) {
    i(e, n.PluginFreeFallbackScreenSharing);
  };
  t.sendMicrophoneAccessFallbackMessage = function (e) {
    i(e, n.PluginFreeFallbackMicrophoneAccess);
  };
  t.sendOutgoingP2PCallFallbackMessage = function (e) {
    i(e, n.PluginFreeFallbackOutgoingP2PCall);
  };
  t.sendIncomingP2PCallFallbackMessage = function (e) {
    i(e, n.PluginFreeFallbackIncomingP2PCall);
  };
  t.sendNoVideoCapabilityMessage = function (e) {
    i(e, n.PluginFreeNoVideoCapability);
  };
});
