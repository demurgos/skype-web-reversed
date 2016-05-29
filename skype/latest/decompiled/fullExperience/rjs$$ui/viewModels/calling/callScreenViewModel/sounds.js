define("ui/viewModels/calling/callScreenViewModel/sounds", [
  "require",
  "ui/controls/calling/sounds",
  "constants/calling"
], function (e) {
  function i(e) {
    r = e.state.subscribe(function (e) {
      switch (e) {
      case n.CALLING:
        u();
        break;
      case n.EARLY_MEDIA:
      case n.CONNECTED:
      case n.ENDED:
        a();
        break;
      case n.ENDING:
        a(), o();
      }
    });
  }
  function s() {
    r.dispose();
  }
  function o() {
    t.playOnce(t.KEYS.CALL_END_CALL);
  }
  function u() {
    t.playOnce(t.KEYS.CALL_OUTGOING_P1, function () {
      t.playLoop(t.KEYS.CALL_OUTGOING_P2);
    });
  }
  function a() {
    t.stop(t.KEYS.CALL_OUTGOING_P1);
    t.stop(t.KEYS.CALL_OUTGOING_P2);
  }
  var t = e("ui/controls/calling/sounds"), n = e("constants/calling").CALL_STATES, r;
  return {
    init: i,
    dispose: s
  };
});
