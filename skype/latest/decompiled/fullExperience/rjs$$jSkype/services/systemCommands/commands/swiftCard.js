define("jSkype/services/systemCommands/commands/swiftCard", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "jSkype/settings",
  "constants/common",
  "lodash-compat"
], function (e, t) {
  function o() {
    this.isAvailableFor = r.isFeatureOn(i.featureFlags.SWIFT_CARD_COMMAND) ? n.availableAlways : n.availableNever;
    this.help = "[swift card json]";
    this.showInHelp = !1;
    this.action = function (e, t) {
      if (s.isEmpty(s.trim(t)))
        return;
      t = t.replace(/<a href[^>]+?>/gi, "").replace(/<\/a>/g, "");
      if (e.chatService._sendSwiftCard.enabled())
        try {
          e.chatService._sendSwiftCard("<SwiftCard Swift=\"" + encodeURIComponent(JSON.stringify(JSON.parse(t))) + "\">Testing SwiftCard</SwiftCard>").catch(function (e) {
          });
        } catch (r) {
          n.sendSystemMessage(e, "There was error processing swift card json.");
        }
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("jSkype/settings"), i = e("constants/common"), s = e("lodash-compat");
  t.build = function () {
    return new o();
  };
});
