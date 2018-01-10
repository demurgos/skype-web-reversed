(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/property", [
      "require",
      "exports",
      "lodash-compat",
      "../../../../lib/services/systemCommands/commandsHelper",
      "../../../../lib/services/systemCommands/commands/properties/admins",
      "../../../../lib/services/systemCommands/commands/properties/role",
      "../../../../lib/services/systemCommands/commands/properties/uri",
      "../../../../lib/services/systemCommands/commands/properties/options"
    ], e);
}(function (e, t) {
  function l(e) {
    a = e;
  }
  var n = e("lodash-compat"), r = e("../../../../lib/services/systemCommands/commandsHelper"), i = e("../../../../lib/services/systemCommands/commands/properties/admins"), s = e("../../../../lib/services/systemCommands/commands/properties/role"), o = e("../../../../lib/services/systemCommands/commands/properties/uri"), u = e("../../../../lib/services/systemCommands/commands/properties/options"), a = {
      admins: i,
      role: s,
      uri: o,
      options: u
    }, f = function () {
      function e(e) {
        var t = this;
        this.commands = {};
        this.showInHelp = !0;
        this.method = e;
        n.forOwn(a, function (n, r) {
          var i = n.build();
          i[e] && (t.commands[r.toLowerCase()] = i[e]);
        });
      }
      return e.prototype.isAvailableFor = function (e) {
        return n(this.commands).values().some(function (t) {
          return t && t.isAvailableFor(e);
        });
      }, e.prototype.help = function (e) {
        var t = [];
        return n.forOwn(this.commands, function (n, r) {
          n && n.isAvailableFor(e) && t.push({
            key: r,
            command: n
          });
        }), t.map(function (e) {
          return e.key + (e.command.help ? " " + e.command.help() : "");
        });
      }, e.prototype.action = function (e, t, n) {
        var i = t.match(/^(\w+)\s*(.+)?/), s = i && i[1] && i[1].toLowerCase(), o = i && this.commands[s];
        n.data.argument = t;
        if (!o || !o.isAvailableFor(e)) {
          r.sendSystemMessage(e, "Unknown argument: '" + s + "'");
          n.data.isSuccess = !1;
          n.publish();
          return;
        }
        o.action(e, i && i[2]);
        n.data.isSuccess = !0;
        n.publish();
      }, e;
    }();
  t.Property = f;
  t.get = {
    build: function () {
      return new f("get");
    }
  };
  t.set = {
    build: function () {
      return new f("set");
    }
  };
  t._setCommandBuilders = l;
}));
