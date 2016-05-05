define("ui/viewModels/chat/chatInputPollButton", [
  "require",
  "exports",
  "module",
  "constants/common",
  "lodash-compat",
  "utils/common/eventMixin",
  "constants/keys",
  "utils/common/eventHelper"
], function (e, t) {
  function u(e) {
    var t = this;
    t.isDisabled = e.isDisabled, t.conversationModel = e.conversationModel, t.openPollDesigner = function (e) {
      o.getKeyCode(e) === s.ENTER && e.preventDefault(), t.dispatchEvent(n.events.mediaPicker.POLL_BUTTON_SELECTED, null, t.DIRECTION.PARENT), t.dispatchEvent(n.events.mediaPicker.CLOSE_PICKER, null, t.DIRECTION.PARENT);
    };
  }
  var n = e("constants/common"), r = e("lodash-compat"), i = e("utils/common/eventMixin"), s = e("constants/keys"), o = e("utils/common/eventHelper");
  t.build = function (e) {
    return new u(e);
  }, r.assign(u.prototype, i);
})
