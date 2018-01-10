(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/calling/callNotificationTimeout", [
      "require",
      "exports",
      "jskype-settings-instance",
      "swx-enums",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function o(e, t) {
    s[e.conversationId] || (s[e.conversationId] = {
      notifiedSubscription: null,
      timeoutReference: null
    }, s[e.conversationId].notifiedSubscription = e.selfParticipant.audio.state.once(r.callConnectionState.Notified, function () {
      s[e.conversationId].timeoutReference = i.getWindow().setTimeout(function () {
        t();
        u(e);
      }, n.settings.incomingCalls.notificationTimeout);
    }));
  }
  function u(e) {
    var t = s[e.conversationId];
    t && (t.timeoutReference && i.getWindow().clearTimeout(t.timeoutReference), t.notifiedSubscription && typeof t.notifiedSubscription.dispose == "function" && t.notifiedSubscription.dispose(), delete s[e.conversationId]);
  }
  var n = e("jskype-settings-instance"), r = e("swx-enums"), i = e("swx-browser-globals"), s = {};
  t.observe = o;
  t.clearTimeout = u;
}));
