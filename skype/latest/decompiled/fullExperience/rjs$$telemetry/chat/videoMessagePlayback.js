define("telemetry/chat/videoMessagePlayback", [
  "require",
  "experience/settings",
  "constants/common",
  "ui/telemetry/telemetryClient"
], function (e) {
  function i() {
    function o(e) {
      r.get().sendEvent(t.telemetry.uiTenantToken, i, e);
    }
    var e = this, i = n.chat.VIDEO_MESSAGE.TYPE, s = {};
    e.sendLoadedEvent = function () {
      s.action = n.chat.VIDEO_MESSAGE.eventName.LOADED;
      o(s);
    };
    e.sendFirstPlayAction = function () {
      s.action = n.chat.VIDEO_MESSAGE.action.FIRST_PLAY;
      o(s);
    };
    e.sendFullscreenAction = function () {
      s.action = n.chat.VIDEO_MESSAGE.action.FULLSCREEN;
      o(s);
    };
    e.sendSeekAction = function () {
      s.action = n.chat.VIDEO_MESSAGE.action.SEEK;
      o(s);
    };
    e.sendReplayAction = function () {
      s.action = n.chat.VIDEO_MESSAGE.action.REPLAY;
      o(s);
    };
  }
  var t = e("experience/settings"), n = e("constants/common").telemetry, r = e("ui/telemetry/telemetryClient");
  return new i();
});
