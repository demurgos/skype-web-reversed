define("ui/viewModels/calling/callScreenViewModel/rosterViewModel", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-constants",
  "swx-enums",
  "browser/window",
  "utils/common/eventMixin",
  "swx-utils-common",
  "utils/common/scroll"
], function (e) {
  function f(e, t) {
    function d() {
      u.execute(function () {
        o.dispatchEvent(r.events.callScreen.ROSTER_WIDTH_CHANGED, p.getRosterWidth(), o.DIRECTION.PARENT);
      });
    }
    function v() {
      o.layoutItemModels().forEach(function (e) {
        e.appendParticipantComponentToNewContainer(o.rosterParticipantsContainer);
      });
      d();
    }
    var o = this, f, l, c, h, p;
    o.layoutItemModels = e.layoutItemModels;
    o.selfLayoutItemModel = e.selfLayoutItemModel;
    o.isLocalVideoOn = o.selfLayoutItemModel.isVideoActive;
    o.conversation = e.conversation;
    o.rosterParticipantsContainer = n.observable();
    o.init = function (e) {
      p = e;
      p.init(d);
      f = a.build(t);
      f.init({ horizontal: !0 });
      l = o.layoutItemModels.subscribe(v);
      c = o.selfLayoutItemModel.isVideoActive.subscribe(d);
      h = o.selfLayoutItemModel.participant.audio.state.when(i.callConnectionState.Connected, d);
    };
    o.dispose = function () {
      p.dispose();
      f.dispose();
      l.dispose();
      c.dispose();
      h.dispose();
      s.removeEventListener(r.events.browser.RESIZE, d);
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-constants").COMMON, i = e("swx-enums"), s = e("browser/window"), o = e("utils/common/eventMixin"), u = e("swx-utils-common").async, a = e("utils/common/scroll");
  return t.assign(f.prototype, o), {
    build: function (e, t) {
      return new f(e, t);
    }
  };
});
