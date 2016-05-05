define("ui/viewModels/chat/pes/itemRoster", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-i18n",
  "constants/common",
  "utils/common/eventMixin",
  "services/pes/constants"
], function (e) {
  function u() {
    function s(t) {
      e.item(t);
    }
    function u(t) {
      if (t === e.item() && t.isPlaying && t.isPlaying())
        return;
      e.lockedItem && e.lockedItem.isLocked(!1), e.item(t), t.isLocked(!0), e.lockedItem = t, e.play();
    }
    function a() {
      e.registerEvent(i.expressionPicker.ITEM_PREVIEW_REQUEST, s), e.registerEvent(i.expressionPicker.ITEM_SELECT_REQUEST, u), e.registerEvent(i.expressionPicker.ITEM_CANCEL_REQUEST, e._pauseVideo), e.registerEvent(i.expressionPicker.CLOSE_REQUEST, e._reset);
    }
    var e = this, t = r.fetch({ key: "emoticonPicker_heading_label" });
    e.item = n.observable(), e.lockedItem = null, e._pauseVideo = function () {
      var t = document.querySelector("video.moji.preview");
      t && t.pause && t.pause(), e.lockedItem && e.lockedItem.isLocked(!1), e.lockedItem = null;
    }, e._reset = function () {
      e._pauseVideo(), e.item({
        type: "",
        description: t,
        copyright: "",
        isLocked: function () {
          return !1;
        },
        isPlaying: function () {
          return !1;
        }
      });
    }, e.init = function () {
      a(), e._reset();
    }, e.dispose = function () {
      e._reset();
    }, e.play = function () {
      function r() {
        t.isPlaying(!1), t.isPlayed(!0), t.onPlayed(), n.removeEventListener("ended", r), n.removeEventListener("pause", i);
      }
      function i() {
        t.isPlaying(!1), t.isPlayed(!0), t.onPlayed(), n.removeEventListener("ended", r), n.removeEventListener("pause", i);
      }
      var t = e.item(), n = document.querySelector("video.moji.preview");
      if (t.type !== o.itemTypes.moji.id)
        return;
      t.isPlaying(!0), n.play(), n.addEventListener("ended", r, !1), n.addEventListener("pause", i, !1);
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("constants/common").events, s = e("utils/common/eventMixin"), o = e("services/pes/constants");
  return t.assign(u.prototype, s), u;
})
