(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/me", [
      "require",
      "exports",
      "../../../../lib/services/systemCommands/commandsHelper",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  function u() {
    return new o();
  }
  var n = e("../../../../lib/services/systemCommands/commandsHelper"), r = e("swx-jskype-internal-application-instance"), i = e("jskype-settings-instance"), s = e("swx-constants"), o = function () {
      function e() {
        this.isAvailableFor = i.isFeatureOn(s.COMMON.featureFlags.ME_COMMAND_ENABLED) ? n.availableAlways : n.availableNever;
        this.help = "[message] - sends special message prepended by your name";
        this.showInHelp = !0;
        this.action = function (e, t, n) {
          if (!t)
            return;
          var i = r.get().personsAndGroupsManager.mePerson.displayName();
          t = i + " " + t;
          e.chatService.sendMessage(t, null, { skypeemoteoffset: i.length + 1 });
          n.data.isSuccess = !0;
          n.publish();
        };
      }
      return e;
    }();
  t.Me = o;
  t.build = u;
}));
