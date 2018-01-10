define("telemetry/chat/messagesCollector", [
  "require",
  "telemetry/chat/activityItemHelper",
  "telemetry/chat/messagesReceived",
  "services/telemetry/common/telemetryContext",
  "utils/common/styleModeHelper"
], function (e) {
  function u() {
    function u() {
      function t() {
        o = new n();
        o.publish(e.receivedMessagesInfo);
        e.receivedMessagesInfo = [];
        window.setTimeout(t, s);
      }
      window.setTimeout(t, s);
    }
    var e = r.get(), o;
    this.enqueueReceivedMessageInfo = function (r) {
      var s = { cmid: r.clientmessageid };
      s.typeId = t.getTelemetryMessageTypeObsolete(r);
      s.appIsActive = i.get().appIsVisible();
      s.unreadMessages = r.conversationModel.historyService.unreadActivityItemsCount();
      e.receivedMessagesInfo.push(s);
    };
    u();
  }
  var t = e("telemetry/chat/activityItemHelper"), n = e("telemetry/chat/messagesReceived"), r = e("services/telemetry/common/telemetryContext"), i = e("utils/common/styleModeHelper"), s = 30000, o;
  return u.get = function () {
    return o || (o = new u()), o;
  }, u;
});
