(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/showMembers", [
      "require",
      "exports",
      "../../../../lib/services/systemCommands/commandsHelper",
      "swx-enums"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("../../../../lib/services/systemCommands/commandsHelper"), r = e("swx-enums"), i = function () {
      function e() {
        this.isAvailableFor = n.availableForAllGroupMembers;
        this.showInHelp = !0;
        this.action = function (e, t, i) {
          var s = "CONVERSATION MEMBERS:", o = e.participants().concat(e.selfParticipant);
          o.forEach(function (e) {
            s += "\n  " + e.person.id() + " " + (e.role() === r.participantRole.Attendee ? "SPEAKER" : "ADMIN");
          });
          n.sendSystemMessage(e, s);
          i.data.isSuccess = !0;
          i.publish();
        };
      }
      return e;
    }();
  t.ShowMembers = i;
  t.build = s;
}));
