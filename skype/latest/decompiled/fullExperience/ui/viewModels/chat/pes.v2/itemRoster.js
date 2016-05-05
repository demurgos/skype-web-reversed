define("ui/viewModels/chat/pes.v2/itemRoster", [
  "require",
  "lodash-compat",
  "browser/dom",
  "utils/common/async",
  "utils/common/stateMixin",
  "utils/common/eventHelper",
  "services/pes/constants",
  "vendor/knockout"
], function (e) {
  function a(e, t) {
    function f() {
      var e = n.getElement("video.moji.preview", t);
      e && e.pause && e.pause();
    }
    function l() {
      function r(e) {
        s.params.eventEmitter.emit(e);
      }
      function i() {
        e.removeEventListener("ended", i), e.removeEventListener("pause", u), r("handlePlaybackPaused");
      }
      function u() {
        e.removeEventListener("ended", i), e.removeEventListener("pause", u), r("handlePlaybackPaused");
      }
      var e = n.getElement("video.moji.preview", t);
      if (!e || s.params.item() && s.params.item().type() !== o.itemTypes.moji.id)
        return;
      e.play(), e.addEventListener("ended", i, !1), e.addEventListener("pause", u, !1);
    }
    var s = this, a;
    s.params = i.overrideDefaults({}, s.getDefaultParams(), e), s.playState = u.computed(function () {
      return s.params.itemStartPlayRequest() > 0;
    }), a = s.params.itemStartPlayRequest.subscribe(function (e) {
      r.execute(function () {
        e > 0 ? l() : f();
      }, null, !0);
    }), s.init = function () {
    }, s.dispose = function () {
      a.dispose(), s.playState.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("browser/dom"), r = e("utils/common/async"), i = e("utils/common/stateMixin"), s = e("utils/common/eventHelper"), o = e("services/pes/constants"), u = e("vendor/knockout");
  return a.prototype.getDefaultParams = function () {
    return {
      item: {},
      itemStartPlayRequest: 0,
      eventEmitter: s.emptyEmitter
    };
  }, t.assign(a.prototype, i), a;
})
