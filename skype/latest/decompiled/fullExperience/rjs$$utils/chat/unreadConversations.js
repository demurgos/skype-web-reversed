define("utils/chat/unreadConversations", [
  "require",
  "vendor/knockout",
  "cafe/applicationInstance",
  "utils/common/cafeObservable"
], function (e) {
  function s() {
    function u(n, r) {
      t.utils.addOrRemoveItem(e(), n, !r);
      e.valueHasMutated();
    }
    function a(e) {
      e.__subUnread && e.__subUnread.dispose();
      var t = e.historyService.activityItems;
      t().length && (e.__subUnread = t(t().length - 1).isRead.changed(u.bind(null, e)));
    }
    function f(e) {
      e.__subUnreadActivityItems = e.historyService.activityItems.changed(a.bind(null, e));
    }
    function l(e) {
      e.__subUnreadActivityItems.dispose();
    }
    var e = t.observableArray(), i, s = r.newObservableProperty(n.get().conversationsManager.unreadConversationsCount).extend({ rateLimit: 300 }), o = t.pureComputed({
        deferEvaluation: !0,
        read: function () {
          return i || (n.get().conversationsManager.conversations.added(f), n.get().conversationsManager.conversations.removed(l), i = !0), e();
        }
      });
    return {
      getUnread: o,
      getCount: s
    };
  }
  var t = e("vendor/knockout"), n = e("cafe/applicationInstance"), r = e("utils/common/cafeObservable"), i;
  return {
    getInstance: function () {
      return i || (i = s()), i;
    },
    destroy: function () {
      i = null;
    }
  };
});
