(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/topic", [
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
        this.isAvailableFor = n.availableForAllGroupMembers;
        this.help = "[text]";
        this.showInHelp = !0;
        this.action = function (e, t, n) {
          n.data.isSuccess = !1;
          if (r.isEmpty(r.trim(t))) {
            n.publish();
            return;
          }
          e.topic.set.enabled() && (e.topic.set(t)["catch"](function (e) {
          }), n.data.isSuccess = !0);
          n.publish();
        };
      }
      return e;
    }();
  t.Topic = i;
  t.build = s;
}));
