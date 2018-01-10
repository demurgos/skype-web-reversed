(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/help", [
      "require",
      "exports",
      "../../../../lib/services/systemCommands/commandsHelper",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("../../../../lib/services/systemCommands/commandsHelper"), r = e("lodash-compat"), i = function () {
      function e() {
        this.isAvailableFor = n.availableAlways;
        this.showInHelp = !0;
        this.action = function (e, t, i) {
          var s = "Available commands:\n";
          r.forIn(t, function (t, n) {
            if (t.isAvailableFor(e) && t.showInHelp)
              if (r.isFunction(t.help)) {
                var i = t.help(e);
                i.forEach(function (e) {
                  s += "  /" + n + " " + e + "\n";
                });
              } else
                s += "  /" + n, s += t.help ? " " + t.help : "", s += "\n";
          });
          n.sendSystemMessage(e, s);
          i.data.isSuccess = i.data.name === "help";
          i.publish();
        };
      }
      return e;
    }();
  t.Help = i;
  t.build = s;
}));
