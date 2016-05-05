define("jSkype/services/systemCommands/commands/property", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commands/properties/admins",
  "jSkype/services/systemCommands/commands/properties/role",
  "jSkype/services/systemCommands/commands/properties/uri",
  "jSkype/services/systemCommands/commands/properties/options",
  "lodash-compat",
  "jSkype/services/systemCommands/commandsHelper"
], function (e, t) {
  function s(e) {
    var t = {};
    r.forOwn(n, function (n, r) {
      var i = n.build();
      i[e] && (t[r.toLowerCase()] = i[e]);
    }), this.commands = t;
  }
  var n = {
      admins: e("jSkype/services/systemCommands/commands/properties/admins"),
      role: e("jSkype/services/systemCommands/commands/properties/role"),
      uri: e("jSkype/services/systemCommands/commands/properties/uri"),
      options: e("jSkype/services/systemCommands/commands/properties/options")
    }, r = e("lodash-compat"), i = e("jSkype/services/systemCommands/commandsHelper");
  s.prototype.isAvailableFor = function (t) {
    return r(this.commands).values().any(function (e) {
      return e && e.isAvailableFor(t);
    });
  }, s.prototype.help = function (t) {
    var n = [];
    return r.forOwn(this.commands, function (e, r) {
      e && e.isAvailableFor(t) && n.push({
        key: r,
        command: e
      });
    }), n.map(function (e) {
      return e.key + (e.command.help ? " " + e.command.help() : "");
    });
  }, s.prototype.showInHelp = !0, s.prototype.action = function (t, n) {
    var r = n.match(/^(\w+)\s*(.+)?/), s = r && r[1] && r[1].toLowerCase(), o = r && this.commands[s];
    if (!o || !o.isAvailableFor(t)) {
      i.sendSystemMessage(t, "Unknown argument: '" + s + "'");
      return;
    }
    o.action(t, r && r[2]);
  }, t.get = {
    build: function () {
      return new s("get");
    }
  }, t.set = {
    build: function () {
      return new s("set");
    }
  }, t._setCommandBuilders = function (t) {
    n = t;
  };
})
