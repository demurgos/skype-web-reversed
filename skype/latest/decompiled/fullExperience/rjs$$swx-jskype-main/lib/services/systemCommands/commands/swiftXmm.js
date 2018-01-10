(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/swiftXmm", [
      "require",
      "exports",
      "lodash-compat",
      "jskype-settings-instance",
      "../../../../lib/services/systemCommands/commandsHelper",
      "swx-constants"
    ], e);
}(function (e, t) {
  function u() {
    return new o();
  }
  var n = e("lodash-compat"), r = e("jskype-settings-instance"), i = e("../../../../lib/services/systemCommands/commandsHelper"), s = e("swx-constants"), o = function () {
      function e() {
        this.isAvailableFor = r.isFeatureOn(s.COMMON.featureFlags.SWIFT_CARD_COMMAND) ? i.availableAlways : i.availableNever;
        this.help = "[swift xmm json]";
        this.showInHelp = !1;
        this.action = function (e, t) {
          if (n.isEmpty(n.trim(t)))
            return;
          t = t.replace(/<a href[^>]+?>/gi, "").replace(/<\/a>/g, "");
          if (e.chatService._sendSwiftCard.enabled())
            try {
              var r = "<URIObject type=\"SWIFT.1\"><Title>Testing Action card</Title><Swift b64=\"" + btoa(JSON.stringify(JSON.parse(t))) + "\"/></URIObject>";
              e.chatService._sendSwiftCard(r, !0)["catch"](function (e) {
              });
            } catch (s) {
              i.sendSystemMessage(e, "There was error processing swift card json.\n" + s.toString());
            }
        };
      }
      return e;
    }();
  t.SwiftXMM = o;
  t.build = u;
}));
