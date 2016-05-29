define("ui/viewModels/calling/callScreenViewModel/rosterViewModel", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "constants/common",
  "swx-enums",
  "browser/window",
  "utils/common/eventMixin",
  "utils/common/async",
  "utils/common/scroll"
], function (e) {
  function f(e, t) {
    function v() {
      u.execute(function () {
        d || o.dispatchEvent(r.events.callScreen.ROSTER_WIDTH_CHANGED, p.getRosterWidth(), o.DIRECTION.PARENT);
      });
    }
    var o = this, f, l, c, h, p, d = !1;
    o.participants = e.participants;
    o.isGroupConversation = e.isGroupConversation;
    o.selfParticipant = e.selfParticipant;
    o.isLocalVideoOn = e.isLocalVideoOn;
    o.localAspectRatio = n.observable("");
    o.isVisible = e.isVisible;
    o.isLocalVideoAllowed = e.isLocalVideoAllowed;
    o.disposed = !1;
    o.init = function (e) {
      p = e;
      p.init(v);
      f = a.build(t);
      f.init({ horizontal: !0 });
      l = o.participants.subscribe(v);
      c = o.isLocalVideoOn.subscribe(v);
      h = o.selfParticipant.audio.state.when(i.callConnectionState.Connected, v);
    };
    o.dispose = function () {
      d = !0;
      p.dispose();
      f.dispose();
      l.dispose();
      c.dispose();
      h.dispose();
      s.removeEventListener(r.events.browser.RESIZE, v);
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("constants/common"), i = e("swx-enums"), s = e("browser/window"), o = e("utils/common/eventMixin"), u = e("utils/common/async"), a = e("utils/common/scroll");
  return t.assign(f.prototype, o), {
    build: function (e, t) {
      return new f(e, t);
    }
  };
});
