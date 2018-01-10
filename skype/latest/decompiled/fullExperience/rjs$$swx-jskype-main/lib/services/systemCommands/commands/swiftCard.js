(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/swiftCard", [
      "require",
      "exports",
      "../../../../lib/services/systemCommands/commandsHelper",
      "jskype-settings-instance",
      "swx-constants",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function u() {
    return new o();
  }
  var n = e("../../../../lib/services/systemCommands/commandsHelper"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = e("lodash-compat"), o = function () {
      function e() {
        this.isAvailableFor = r.isFeatureOn(i.COMMON.featureFlags.SWIFT_CARD_COMMAND) ? n.availableAlways : n.availableNever;
        this.help = "[swift card json]";
        this.showInHelp = !1;
        this.action = function (e, t) {
          if (s.isEmpty(s.trim(t)))
            return;
          t = t.replace(/<a href[^>]+?>/gi, "").replace(/<\/a>/g, "");
          if (e.chatService._sendSwiftCard.enabled())
            try {
              e.chatService._sendSwiftCard("<SwiftCard Swift=\"" + encodeURIComponent(JSON.stringify(JSON.parse(t))) + "\">Testing SwiftCard</SwiftCard>")["catch"](function (e) {
              });
            } catch (r) {
              n.sendSystemMessage(e, "There was error processing swift card json.");
            }
        };
      }
      return e;
    }();
  t.SwiftCard = o;
  t.build = u;
}));
