define("jSkype/services/systemCommands/commands/setRole", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/services/systemCommands/commandsHelper",
  "swx-enums"
], function (e, t) {
  function o() {
    this.isAvailableFor = r.availableForGroupLeaders;
    this.help = "[Skype Name] ADMIN | USER";
    this.showInHelp = !0;
    this.action = function (e, t) {
      var r = (t || "").split(/\s+/), o = r[0] && r[0].toLowerCase(), u = r[1] && r[1].toLowerCase();
      o[0] === "@" && (o = o.substring(1));
      var a = n.find(e.participants(), function (e) {
        return e.person.id().toLowerCase() === o;
      });
      if (!a || !a.role.set.enabled() || !s.hasOwnProperty(u))
        return;
      a.role(s[u] ? i.participantRole.Leader : i.participantRole.Attendee);
    };
  }
  var n = e("lodash-compat"), r = e("jSkype/services/systemCommands/commandsHelper"), i = e("swx-enums"), s = {
      admin: !0,
      master: !0,
      user: !1,
      speaker: !1
    };
  t.build = function () {
    return new o();
  };
});
