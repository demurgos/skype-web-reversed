define("jSkype/services/systemCommands/commands/properties/options", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commands/properties/options/joiningEnabled",
  "jSkype/services/systemCommands/commands/properties/options/historyDisclosed",
  "lodash-compat",
  "jSkype/services/systemCommands/commandsHelper"
], function (e, t) {
  function s() {
    var e = {};
    r.forOwn(n, function (t, n) {
      e[n.toUpperCase()] = t.build();
    }), this.get = {
      isAvailableFor: i.availableForAllGroupMembers,
      action: function (t) {
        var n = "options=";
        r.forOwn(e, function (e, r) {
          e.isEnabled(t) && (n += r + " ");
        }), i.sendSystemMessage(t, n);
      }
    }, this.set = {
      isAvailableFor: i.availableForAllGroupMembers,
      help: function () {
        return "[[+|-]flag]";
      },
      action: function (t, n) {
        var r = n.slice(1).toUpperCase(), s = e[r], o = n[0] === "+";
        if (!s || !o && n[0] !== "-") {
          i.sendSystemMessage(t, "Unknown flag.");
          return;
        }
        o ? s.enable(t) : s.disable(t);
      }
    };
  }
  var n = {
      JOINING_ENABLED: e("jSkype/services/systemCommands/commands/properties/options/joiningEnabled"),
      HISTORY_DISCLOSED: e("jSkype/services/systemCommands/commands/properties/options/historyDisclosed")
    }, r = e("lodash-compat"), i = e("jSkype/services/systemCommands/commandsHelper");
  t.build = function () {
    return new s();
  }, t._setCommandBuilders = function (t) {
    n = t;
  };
})
