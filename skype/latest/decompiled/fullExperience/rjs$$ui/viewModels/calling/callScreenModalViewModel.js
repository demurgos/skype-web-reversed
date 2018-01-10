define("ui/viewModels/calling/callScreenModalViewModel", [
  "require",
  "lodash-compat",
  "swx-utils-common",
  "swx-constants",
  "swx-constants",
  "utils/common/eventMixin",
  "utils/common/focusRestrictor",
  "utils/common/outsideClickHandler"
], function (e) {
  function f(e, t) {
    var n = this, s = o.build(t, i.CALL_SCREEN_DIALOG.ALLOWED_FOCUS_SELECTORS);
    return n.close = function () {
      n.dispatchEvent(r.events.callScreen.TOGGLE_MODAL_DIALOG, e, n.DIRECTION.PARENT);
    }, n.init = function () {
      u.add(a, n.close);
      s.restrict();
    }, n.dispose = function () {
      u.remove(a);
      s.restore();
    }, n;
  }
  var t = e("lodash-compat"), n = e("swx-utils-common").builderMixin, r = e("swx-constants").COMMON, i = e("swx-constants").CALLING, s = e("utils/common/eventMixin"), o = e("utils/common/focusRestrictor"), u = e("utils/common/outsideClickHandler"), a = "call-screen-modal-content";
  return t.assign(f, n), t.assign(f.prototype, s), f;
});
