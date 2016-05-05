define("jSkype/services/systemCommands/commands/properties/admins", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/services/systemCommands/commandsHelper",
  "swx-enums"
], function (e, t) {
  function s() {
    this.get = {
      isAvailableFor: r.availableForAllGroupMembers,
      action: function (e) {
        var t = "admins=", s = n.filter(e.participants().concat(e.selfParticipant), function (e) {
            return e.role() === i.participantRole.Leader;
          });
        s.forEach(function (e) {
          t += e.person.id() + " ";
        }), r.sendSystemMessage(e, t);
      }
    };
  }
  var n = e("lodash-compat"), r = e("jSkype/services/systemCommands/commandsHelper"), i = e("swx-enums");
  t.build = function () {
    return new s();
  };
})
