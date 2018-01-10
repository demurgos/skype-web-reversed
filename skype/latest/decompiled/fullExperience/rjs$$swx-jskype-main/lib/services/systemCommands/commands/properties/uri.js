(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/properties/uri", [
      "require",
      "exports",
      "../../../../../lib/services/systemCommands/commandsHelper"
    ], e);
}(function (e, t) {
  function i() {
    return new r();
  }
  var n = e("../../../../../lib/services/systemCommands/commandsHelper"), r = function () {
      function e() {
        this.get = {
          isAvailableFor: n.availableForAllGroupMembers,
          action: function (e) {
            e.isJoiningEnabled() ? n.sendSystemMessage(e, e.uri()) : n.sendSystemMessage(e, "Link-based joining not enabled, to enable: /set options +JOINING_ENABLED");
          }
        };
      }
      return e;
    }();
  t.Uri = r;
  t.build = i;
}));
