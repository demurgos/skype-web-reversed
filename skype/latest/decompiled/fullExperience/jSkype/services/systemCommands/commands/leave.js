define("jSkype/services/systemCommands/commands/leave", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper"
], function (e, t) {
  function r() {
    this.isAvailableFor = n.availableForAllGroupMembers, this.showInHelp = !0, this.action = function (e) {
      e.leave.enabled() && e.leave().catch(function (e) {
      });
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper");
  t.build = function () {
    return new r();
  };
})
