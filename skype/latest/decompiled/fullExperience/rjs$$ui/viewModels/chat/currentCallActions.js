define("ui/viewModels/chat/currentCallActions", [
  "require",
  "lodash-compat",
  "utils/common/cafeObservable",
  "utils/common/eventMixin",
  "ui/viewModels/chat/conversationActivity"
], function (e) {
  function s(e) {
    var t = this, r = e.conversationModel, s;
    s = i.build(r);
    t.conversation = r;
    t.isOnCall = s.isOnCall;
    t.canJoinCall = s.canJoinCall;
    t.canJoinWithVideo = n.newObservableProperty(r.videoService.start.enabled);
    t.dispose = function () {
      t.canJoinWithVideo.dispose();
      s.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/cafeObservable"), r = e("utils/common/eventMixin"), i = e("ui/viewModels/chat/conversationActivity");
  return t.assign(s.prototype, r), s;
});
