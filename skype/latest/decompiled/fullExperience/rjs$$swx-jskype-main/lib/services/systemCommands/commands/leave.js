(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/leave", [
      "require",
      "exports",
      "../../../../lib/services/systemCommands/commandsHelper"
    ], e);
}(function (e, t) {
  function i() {
    return new r();
  }
  var n = e("../../../../lib/services/systemCommands/commandsHelper"), r = function () {
      function e() {
        this.isAvailableFor = n.availableForAllGroupMembers;
        this.showInHelp = !0;
        this.action = function (e, t, n) {
          n.data.isSuccess = !1;
          e.leave.enabled() && (e.leave()["catch"](function (e) {
          }), n.data.isSuccess = !0);
          n.publish();
        };
      }
      return e;
    }();
  t.Leave = r;
  t.build = i;
}));
