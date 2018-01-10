(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/moji", [
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
        this.isAvailableFor = n.availableAlways;
        this.help = "[mojiId]";
        this.showInHelp = !1;
        this.action = function (e, t) {
          if (r.isEmpty(r.trim(t)))
            return;
          e.chatService._sendMoji.enabled() && e.chatService._sendMoji(t)["catch"](function (e) {
          });
        };
      }
      return e;
    }();
  t.Moji = i;
  t.build = s;
}));
