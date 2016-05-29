define("jSkype/services/systemCommands/main", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commands/topic",
  "jSkype/services/systemCommands/commands/add",
  "jSkype/services/systemCommands/commands/kick",
  "jSkype/services/systemCommands/commands/leave",
  "jSkype/services/systemCommands/commands/callInfo",
  "jSkype/services/systemCommands/commands/moji",
  "jSkype/services/systemCommands/commands/reportIssue",
  "jSkype/services/systemCommands/commands/showMembers",
  "jSkype/services/systemCommands/commands/swiftCard",
  "jSkype/services/systemCommands/commands/callInfo",
  "jSkype/services/systemCommands/commands/property",
  "jSkype/services/systemCommands/commands/property",
  "jSkype/services/systemCommands/commands/giphy",
  "jSkype/services/systemCommands/commands/alerts",
  "jSkype/services/systemCommands/commands/alerts",
  "jSkype/services/systemCommands/commands/alerts",
  "jSkype/services/systemCommands/commands/setRole",
  "jSkype/services/systemCommands/commands/help",
  "lodash-compat"
], function (e, t) {
  var n = {}, r;
  n.topic = e("jSkype/services/systemCommands/commands/topic");
  n.add = e("jSkype/services/systemCommands/commands/add");
  n.kick = e("jSkype/services/systemCommands/commands/kick");
  n.leave = e("jSkype/services/systemCommands/commands/leave");
  n.callInfo = e("jSkype/services/systemCommands/commands/callInfo");
  n.moji = e("jSkype/services/systemCommands/commands/moji");
  n.reportIssue = e("jSkype/services/systemCommands/commands/reportIssue");
  n.showmembers = e("jSkype/services/systemCommands/commands/showMembers");
  n.swiftCard = e("jSkype/services/systemCommands/commands/swiftCard");
  n.callInfo = e("jSkype/services/systemCommands/commands/callInfo");
  n.get = e("jSkype/services/systemCommands/commands/property").get;
  n.set = e("jSkype/services/systemCommands/commands/property").set;
  n.giphy = e("jSkype/services/systemCommands/commands/giphy");
  n.alerts = e("jSkype/services/systemCommands/commands/alerts");
  n.alertsoff = e("jSkype/services/systemCommands/commands/alerts").off;
  n.alertson = e("jSkype/services/systemCommands/commands/alerts").on;
  n.setrole = e("jSkype/services/systemCommands/commands/setRole");
  n.help = e("jSkype/services/systemCommands/commands/help");
  var i = e("lodash-compat");
  t.SystemCommandsService = function () {
    function t(t, n) {
      var r = t.match(/^[\\\/](\w+)\s*([\s\S]+)?/), i = r && r[1] && r[1].toLowerCase(), s = r && e[i];
      return r && s && !s.isAvailableFor(n) && (s = e.help), {
        command: s,
        data: r && r[2]
      };
    }
    var e = {};
    i.forOwn(n, function (t, n) {
      e[n.toLowerCase()] = t.build();
    });
    this.isSkypeCommand = function (n, r) {
      return !!t(n, r).command;
    };
    this.executeCommand = function (r, i) {
      var s = t(r, i), o = s.command, u = s.data;
      return o ? (o === e.help && (u = e), o.action(i, u), !0) : !1;
    };
  };
  t.get = function () {
    return r = r || new t.SystemCommandsService(), r;
  };
});
