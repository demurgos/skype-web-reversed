define("ui/viewModels/calling/callScreenViewModel/sounds", [
  "require",
  "swx-browser-detect",
  "ui/controls/calling/sounds"
], function (e) {
  function r() {
    if (t.getBrowserInfo().isShellApp)
      return;
    n.playOnce(n.KEYS.CALL_END_CALL);
  }
  function i() {
    if (t.getBrowserInfo().isShellApp)
      return;
    n.playOnce(n.KEYS.CALL_OUTGOING_P1, function () {
      n.playLoop(n.KEYS.CALL_OUTGOING_P2);
    });
  }
  function s() {
    if (t.getBrowserInfo().isShellApp)
      return;
    n.stop(n.KEYS.CALL_OUTGOING_P1);
    n.stop(n.KEYS.CALL_OUTGOING_P2);
    n.stop(n.KEYS.CALL_DIALING);
    n.stop(n.KEYS.CALL_CONNECTING);
  }
  var t = e("swx-browser-detect").default, n = e("ui/controls/calling/sounds");
  return {
    playEndCall: r,
    playRingingOut: i,
    stopAll: s
  };
});
