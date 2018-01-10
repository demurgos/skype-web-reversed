(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/properties/options", [
      "require",
      "exports",
      "lodash-compat",
      "../../../../../lib/services/systemCommands/commandsHelper",
      "../../../../../lib/services/systemCommands/commands/properties/options/joiningEnabled",
      "../../../../../lib/services/systemCommands/commands/properties/options/historyDisclosed"
    ], e);
}(function (e, t) {
  function a() {
    return new u();
  }
  function f(e) {
    o = e;
  }
  var n = e("lodash-compat"), r = e("../../../../../lib/services/systemCommands/commandsHelper"), i = e("../../../../../lib/services/systemCommands/commands/properties/options/joiningEnabled"), s = e("../../../../../lib/services/systemCommands/commands/properties/options/historyDisclosed"), o = {
      JOINING_ENABLED: i,
      HISTORY_DISCLOSED: s
    }, u = function () {
      function e() {
        var e = this;
        this.optionCommands = {};
        this.get = {
          isAvailableFor: r.availableForAllGroupMembers,
          action: function (t) {
            var i = "options=";
            n.forOwn(e.optionCommands, function (e, n) {
              e.isEnabled(t) && (i += n + " ");
            });
            r.sendSystemMessage(t, i);
          }
        };
        this.set = {
          isAvailableFor: r.availableForAllGroupMembers,
          help: function () {
            return "[[+|-]flag]";
          },
          action: function (t, n) {
            var i = n.slice(1).toUpperCase(), s = e.optionCommands[i], o = n[0] === "+";
            if (!s || !o && n[0] !== "-") {
              r.sendSystemMessage(t, "Unknown flag.");
              return;
            }
            o ? s.enable(t) : s.disable(t);
          }
        };
        n.forOwn(o, function (t, n) {
          e.optionCommands[n.toUpperCase()] = t.build();
        });
      }
      return e;
    }();
  t.Options = u;
  t.build = a;
  t._setCommandBuilders = f;
}));
