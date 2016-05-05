define("ui/viewModels/chat/conversationCard", [
  "require",
  "utils/common/cafeObservable"
], function (e) {
  function n(e) {
    var n = this, r = e.conversationModel;
    n.topic = t.newObservableProperty(r.topic), n.isGroupConversation = t.newObservableProperty(r.isGroupConversation), n.avatarUrl = t.newObservableProperty(r.avatarUrl), n.statusClassName = null, n.action = function () {
      e.action && e.action(r);
    };
  }
  var t = e("utils/common/cafeObservable");
  return n;
})
