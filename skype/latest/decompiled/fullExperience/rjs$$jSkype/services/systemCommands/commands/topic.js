define("jSkype/services/systemCommands/commands/topic", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "lodash-compat"
], function (e, t) {
  function i() {
    this.isAvailableFor = n.availableForAllGroupMembers, this.help = "[text]", this.showInHelp = !0, this.action = function (e, t) {
      if (r.isEmpty(r.trim(t)))
        return;
      e.topic.set.enabled() && e.topic.set(t).catch(function (e) {
      });
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("lodash-compat");
  t.build = function () {
    return new i();
  };
})
