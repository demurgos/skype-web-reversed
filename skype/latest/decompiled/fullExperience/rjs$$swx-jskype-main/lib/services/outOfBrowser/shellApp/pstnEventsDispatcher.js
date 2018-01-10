(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/shellApp/pstnEventsDispatcher", [
      "require",
      "exports",
      "swx-constants"
    ], e);
}(function (e, t) {
  var n = e("swx-constants"), r = function () {
      function e(e) {
        var t = this;
        this.process = function (e, r, i, s) {
          t.messagingChannel.sendCommand({
            name: n.OUT_OF_BROWSER.commands.PSTN_EVENT,
            type: n.OUT_OF_BROWSER.commandTypes.REQUEST,
            data: {
              state: s,
              conversationId: e.conversationId,
              participantId: r.person.id(),
              reason: i
            }
          });
        };
        this.messagingChannel = e;
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));
