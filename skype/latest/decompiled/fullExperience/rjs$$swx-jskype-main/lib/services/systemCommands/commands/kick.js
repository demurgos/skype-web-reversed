(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/kick", [
      "require",
      "exports",
      "../../../../lib/services/systemCommands/commandsHelper",
      "swx-utils-chat"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("../../../../lib/services/systemCommands/commandsHelper"), r = e("swx-utils-chat"), i = function () {
      function e() {
        this.isAvailableFor = n.availableForGroupLeaders;
        this.help = "[skypename]";
        this.showInHelp = !0;
        this.action = function (e, t, n) {
          t[0] === "@" && (t = t.substring(1));
          var i = r.conversation.getParticipantFromConversation(e, t);
          n.data.isSuccess = !1;
          if (!i) {
            n.publish();
            return;
          }
          e.participants.remove.enabled() && (e.participants.remove(i)["catch"](function (e) {
          }), n.data.isSuccess = !0);
          n.publish();
        };
      }
      return e;
    }();
  t.Kick = i;
  t.build = s;
}));
