define("experience/api/helpers/conversationsSynchronizer", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance"
], function (e, t) {
  var n = e("cafe/applicationInstance");
  t.sync = function () {
    function r(e) {
      var t = n.get().conversationsManager;
      return t.conversations.size() < 1 && t.getMoreConversations.enabled() ? t.getMoreConversations(1).then(s).catch(i) : s(e);
    }
    function i() {
      return Promise.all([]);
    }
    function s(e) {
      e = e || n.get().conversationsManager.conversations();
      var t = e.reduce(function (e, t) {
        return t.conversationId ? e.concat([t.conversationId]) : e.concat([t.uri() || t.uri.get()]);
      }, []);
      return Promise.all(t);
    }
    var t = n.get().conversationsManager.conversations.get();
    return t.then(r);
  };
});
