(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/setRole", [
      "require",
      "exports",
      "lodash-compat",
      "../../../../lib/services/systemCommands/commandsHelper",
      "swx-enums"
    ], e);
}(function (e, t) {
  function u() {
    return new o();
  }
  var n = e("lodash-compat"), r = e("../../../../lib/services/systemCommands/commandsHelper"), i = e("swx-enums"), s = {
      admin: !0,
      master: !0,
      user: !1,
      speaker: !1
    }, o = function () {
      function e() {
        this.isAvailableFor = r.availableForGroupLeaders;
        this.help = "[Skype Name] ADMIN | USER";
        this.showInHelp = !0;
        this.action = function (e, t, r) {
          var o = (t || "").split(/\s+/), u = o[0] && o[0].toLowerCase(), a = o[1] && o[1].toLowerCase();
          u[0] === "@" && (u = u.substring(1));
          s.hasOwnProperty(a) && (r.data.argument = a);
          var f = n.find(e.participants(), function (e) {
            return e.person.id().toLowerCase() === u;
          });
          if (!f || !f.role.set.enabled() || !s.hasOwnProperty(a)) {
            r.data.isSuccess = !1;
            r.publish();
            return;
          }
          f.role(s[a] ? i.participantRole.Leader : i.participantRole.Attendee);
          r.data.isSuccess = !0;
          r.publish();
        };
      }
      return e;
    }();
  t.SetRole = o;
  t.build = u;
}));
