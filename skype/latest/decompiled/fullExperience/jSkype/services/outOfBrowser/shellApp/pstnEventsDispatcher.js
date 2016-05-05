define("jSkype/services/outOfBrowser/shellApp/pstnEventsDispatcher", [
  "require",
  "constants/outOfBrowser"
], function (e) {
  function n(e) {
    this.process = function (n, r, i, s) {
      e.sendCommand({
        name: t.commands.PSTN_EVENT,
        type: t.commandTypes.REQUEST,
        data: {
          state: s,
          conversationId: n.conversationId,
          participantId: r.person.id(),
          reason: i
        }
      });
    };
  }
  var t = e("constants/outOfBrowser");
  return n;
})
