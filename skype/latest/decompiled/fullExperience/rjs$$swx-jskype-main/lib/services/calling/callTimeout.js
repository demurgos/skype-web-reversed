(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/calling/callTimeout", [
      "require",
      "exports",
      "jskype-settings-instance",
      "swx-enums",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function o(e, t) {
    t();
    u(e);
  }
  function u(e) {
    var t = s[e.conversationId];
    t && (i.getWindow().clearTimeout(t.timer), t.callStateSubscription.dispose(), delete s[e.conversationId]);
  }
  function a(e) {
    return e === r.callConnectionState.Disconnected || e === r.callConnectionState.Connected;
  }
  function f(e, t) {
    if (e.selfParticipant.audio.state() === r.callConnectionState.Notified || e.activeModalities.audio()) {
      var f = {};
      f.timer = i.getWindow().setTimeout(o.bind(null, e, t), n.settings.incomingCalls.connectTimeout);
      f.callStateSubscription = e.selfParticipant.audio.state.when(a, u.bind(null, e));
      s[e.conversationId] = f;
    }
  }
  var n = e("jskype-settings-instance"), r = e("swx-enums"), i = e("swx-browser-globals"), s = {};
  t.callStart = f;
}));
