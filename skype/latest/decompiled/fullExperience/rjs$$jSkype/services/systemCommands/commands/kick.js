define("jSkype/services/systemCommands/commands/kick", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "jSkype/modelHelpers/participantHelper"
], function (e, t) {
  function i() {
    this.isAvailableFor = n.availableForGroupLeaders;
    this.help = "[skypename]";
    this.showInHelp = !0;
    this.action = function (e, t) {
      t[0] === "@" && (t = t.substring(1));
      var n = r.getParticipantFromConversation(e, t);
      if (!n)
        return;
      e.participants.remove.enabled() && e.participants.remove(n).catch(function (e) {
      });
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("jSkype/modelHelpers/participantHelper");
  t.build = function () {
    return new i();
  };
});
