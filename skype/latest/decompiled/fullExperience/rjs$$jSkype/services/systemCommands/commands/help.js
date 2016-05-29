define("jSkype/services/systemCommands/commands/help", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "lodash-compat"
], function (e, t) {
  function i() {
    this.isAvailableFor = n.availableAlways;
    this.showInHelp = !0;
    this.action = function (e, t) {
      var i = "Available commands:\n";
      r.forIn(t, function (t, n) {
        if (t.isAvailableFor(e) && t.showInHelp)
          if (r.isFunction(t.help)) {
            var s = t.help(e);
            s.forEach(function (e) {
              i += "  /" + n + " " + e + "\n";
            });
          } else
            i += "  /" + n, i += t.help ? " " + t.help : "", i += "\n";
      });
      n.sendSystemMessage(e, i);
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("lodash-compat");
  t.build = function () {
    return new i();
  };
});
