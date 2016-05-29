define("ui/viewModels/chat/currentCallActions", [
  "require",
  "lodash-compat",
  "utils/common/eventMixin",
  "ui/viewModels/chat/conversationActivity"
], function (e) {
  function i(e) {
    var t = this, n = e.conversationModel, i;
    i = r.build(n);
    t.conversation = n;
    t.isOnCall = i.isOnCall;
    t.canJoinCall = i.canJoinCall;
    t.dispose = function () {
      i.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/eventMixin"), r = e("ui/viewModels/chat/conversationActivity");
  return t.assign(i.prototype, n), i;
});
