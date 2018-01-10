define("telemetry/chat/audioMessagePlayback", [
  "require",
  "experience/settings",
  "swx-constants",
  "ui/telemetry/telemetryClient"
], function (e) {
  function i() {
    function o(e) {
      r.get().sendEvent(t.telemetry.chatTenantToken, i, e);
    }
    var e = this, i = n.chat.AUDIO_MESSAGE.TYPE, s = {};
    e.sendFirstPlayAction = function () {
      s.action = n.chat.AUDIO_MESSAGE.action.VM_CHAT_PLAYBACK;
      o(s);
    };
    e.sendReplayAction = function () {
      s.action = n.chat.AUDIO_MESSAGE.action.VM_CHAT_REPLAY;
      o(s);
    };
  }
  var t = e("experience/settings"), n = e("swx-constants").COMMON.telemetry, r = e("ui/telemetry/telemetryClient");
  return new i();
});
