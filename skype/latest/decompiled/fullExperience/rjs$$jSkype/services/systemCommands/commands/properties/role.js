define("jSkype/services/systemCommands/commands/properties/role", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "swx-enums"
], function (e, t) {
  function i() {
    this.get = {
      isAvailableFor: n.availableForAllGroupMembers,
      action: function (e) {
        n.sendSystemMessage(e, "role=" + (e.selfParticipant.role() === r.participantRole.Attendee ? "SPEAKER" : "ADMIN"));
      }
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("swx-enums");
  t.build = function () {
    return new i();
  };
});
