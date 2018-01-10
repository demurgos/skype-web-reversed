define("telemetry/chat/messagesReceived", [
  "require",
  "services/telemetry/skypeData",
  "telemetry/chat/activityItemHelper",
  "utils/common/appVisibilityProvider",
  "swx-jskype-internal-application-instance",
  "swx-jskype-main/lib/utils/chat/endpointsDataProvider"
], function (e) {
  function o() {
    var e = i.get().conversationsManager;
    this.publish = function (o) {
      var u, a, f = 0;
      if (o.length === 0)
        return;
      var l = n.getEmptyResult();
      l.totalCount = o.length;
      for (u = 0; u < o.length; u++)
        a = o[u], n.updateResult(l, a.typeId), a.appIsActive && f++;
      l.inOpenedApp = f;
      l.appHasFocus = r.hasFocus();
      l.numberOfUnreadConversations = e.unreadConversationsCount();
      l.activeEndpoints = s.get();
      var c = {
        type: "chat_IM_receiveBatch",
        data: l
      };
      t.push(c);
    };
  }
  var t = e("services/telemetry/skypeData"), n = e("telemetry/chat/activityItemHelper"), r = e("utils/common/appVisibilityProvider"), i = e("swx-jskype-internal-application-instance"), s = e("swx-jskype-main/lib/utils/chat/endpointsDataProvider");
  return o;
});
