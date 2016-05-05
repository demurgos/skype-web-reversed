define("jSkype/services/systemCommands/commands/moji", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "lodash-compat"
], function (e, t) {
  function i() {
    this.isAvailableFor = n.availableAlways, this.help = "[mojiId]", this.showInHelp = !1, this.action = function (e, t) {
      if (r.isEmpty(r.trim(t)))
        return;
      e.chatService._sendMoji.enabled() && e.chatService._sendMoji(t).catch(function (e) {
      });
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("lodash-compat");
  t.build = function () {
    return new i();
  };
})
