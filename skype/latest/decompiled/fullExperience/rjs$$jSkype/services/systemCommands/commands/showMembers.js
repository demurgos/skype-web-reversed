define("jSkype/services/systemCommands/commands/showMembers", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "swx-enums"
], function (e, t) {
  function i() {
    this.isAvailableFor = n.availableForAllGroupMembers, this.showInHelp = !0, this.action = function (e) {
      var t = "CONVERSATION MEMBERS:", i = e.participants().concat(e.selfParticipant);
      i.forEach(function (e) {
        t += "\n  " + e.person.id() + " " + (e.role() === r.participantRole.Attendee ? "SPEAKER" : "ADMIN");
      }), n.sendSystemMessage(e, t);
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("swx-enums");
  t.build = function () {
    return new i();
  };
})
