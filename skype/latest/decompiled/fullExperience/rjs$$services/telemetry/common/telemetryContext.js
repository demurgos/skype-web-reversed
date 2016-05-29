define("services/telemetry/common/telemetryContext", [
  "require",
  "constants/common"
], function (e) {
  function r() {
    this.sentEmoticonsInfo = [];
    this.sentMessagesInfo = [];
    this.receivedMessagesInfo = [];
    this.currentConversation = null;
    this.timelineLoadOrigin = t.telemetry.NOT_AVAILABLE;
    this.historyLoadOrigin = t.telemetry.NOT_AVAILABLE;
    this.timelineInSearchMode = t.telemetry.NOT_AVAILABLE;
    this.timelineLoadStatusCode = t.telemetry.NOT_AVAILABLE;
    this.activeEndpoints = t.telemetry.NOT_AVAILABLE;
    this.isChatHistoryLoad404 = t.telemetry.NOT_AVAILABLE;
    this.chatHistoryLoadResult = {};
    this.statusCode = !1;
  }
  var t = e("constants/common"), n;
  return r.get = function () {
    return n || (n = new r()), n;
  }, r;
});
