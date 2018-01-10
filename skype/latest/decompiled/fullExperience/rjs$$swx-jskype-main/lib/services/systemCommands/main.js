(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/main", [
      "require",
      "exports",
      "../../../lib/telemetry/systemCommand",
      "../../../lib/services/systemCommands/commands/topic",
      "../../../lib/services/systemCommands/commands/add",
      "../../../lib/services/systemCommands/commands/kick",
      "../../../lib/services/systemCommands/commands/leave",
      "../../../lib/services/systemCommands/commands/callInfo",
      "../../../lib/services/systemCommands/commands/moji",
      "../../../lib/services/systemCommands/commands/reportIssue",
      "../../../lib/services/systemCommands/commands/showMembers",
      "../../../lib/services/systemCommands/commands/swiftCard",
      "../../../lib/services/systemCommands/commands/swiftXmm",
      "../../../lib/services/systemCommands/commands/giphy",
      "../../../lib/services/systemCommands/commands/alerts",
      "../../../lib/services/systemCommands/commands/setRole",
      "../../../lib/services/systemCommands/commands/help",
      "../../../lib/services/systemCommands/commands/me",
      "../../../lib/services/systemCommands/commands/property",
      "../../../lib/services/systemCommands/commands/alerts",
      "lodash-compat",
      "swx-enums"
    ], e);
}(function (e, t) {
  function C() {
    return T = T || new N(), T;
  }
  function k(e) {
    return w.some(S, function (t) {
      return e.indexOf(t) === 0;
    });
  }
  var n = e("../../../lib/telemetry/systemCommand"), r = e("../../../lib/services/systemCommands/commands/topic"), i = e("../../../lib/services/systemCommands/commands/add"), s = e("../../../lib/services/systemCommands/commands/kick"), o = e("../../../lib/services/systemCommands/commands/leave"), u = e("../../../lib/services/systemCommands/commands/callInfo"), a = e("../../../lib/services/systemCommands/commands/moji"), f = e("../../../lib/services/systemCommands/commands/reportIssue"), l = e("../../../lib/services/systemCommands/commands/showMembers"), c = e("../../../lib/services/systemCommands/commands/swiftCard"), h = e("../../../lib/services/systemCommands/commands/swiftXmm"), p = e("../../../lib/services/systemCommands/commands/giphy"), d = e("../../../lib/services/systemCommands/commands/alerts"), v = e("../../../lib/services/systemCommands/commands/setRole"), m = e("../../../lib/services/systemCommands/commands/help"), g = e("../../../lib/services/systemCommands/commands/me"), y = e("../../../lib/services/systemCommands/commands/property"), b = e("../../../lib/services/systemCommands/commands/alerts"), w = e("lodash-compat"), E = e("swx-enums"), S = [
      "\\o/",
      "\\:D/",
      "\\:d/"
    ], x = {
      topic: r,
      add: i,
      kick: s,
      leave: o,
      callInfo: u,
      moji: a,
      reportIssue: f,
      showmembers: l,
      swiftCard: c,
      swiftXmm: h,
      get: y.get,
      set: y.set,
      giphy: p,
      alerts: d,
      alertsoff: b.off,
      alertson: b.on,
      setrole: v,
      help: m,
      me: g
    }, T, N = function () {
      function e() {
        var e = this;
        this.commands = {};
        this.isSkypeCommand = function (t, r) {
          return !k(t) && !!e.parseCommand(t, r, new n["default"]()).command;
        };
        this.executeCommand = function (t, r) {
          if (k(t))
            return !1;
          var i = new n["default"](), s = e.parseCommand(t, r, i), o = s.command, u = s.data;
          return o ? (o === e.commands.help && (u = e.commands), o.action(r, u, i), !0) : !1;
        };
        w.forOwn(x, function (t, n) {
          e.commands[n.toLowerCase()] = t.build();
        });
      }
      return e.prototype.parseCommand = function (e, t, n) {
        var r = e.match(/^\/(\w+)\s*([\s\S]+)?/), i = r && r[1] && r[1].toLowerCase(), s = r && this.commands[i];
        return r && (n.data.name = i, n.data.isExisting = !!s, n.data.isGroup = t.isGroupConversation(), n.data.isAdmin = t.isGroupConversation() && t.selfParticipant.role() === E.participantRole.Leader, n.data.isExisting && (n.data.isAvailable = s.isAvailableFor(t))), r && (!s || !s.isAvailableFor(t)) && (s = this.commands.help), {
          command: s,
          data: r && r[2]
        };
      }, e;
    }();
  t.SystemCommandsService = N;
  t.get = C;
}));
