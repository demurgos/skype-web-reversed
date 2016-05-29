define("jSkype/services/systemCommands/commands/properties/uri", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper"
], function (e, t) {
  function r() {
    this.get = {
      isAvailableFor: n.availableForAllGroupMembers,
      action: function (e) {
        e.isJoiningEnabled() ? n.sendSystemMessage(e, e.uri()) : n.sendSystemMessage(e, "Link-based joining not enabled, to enable: /set options +JOINING_ENABLED");
      }
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper");
  t.build = function () {
    return new r();
  };
});
