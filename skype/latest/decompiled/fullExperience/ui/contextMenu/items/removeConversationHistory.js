define("ui/contextMenu/items/removeConversationHistory", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "ui/modalDialog/removeConversationHistoryDialog",
  "services/serviceLocator",
  "constants/common"
], function (e) {
  function o() {
    return i.resolve(s.serviceLocator.FEATURE_FLAGS).isFeatureOn(s.featureFlags.USE_BUSINESS_WORDING);
  }
  function u(e) {
    return e + "_4b";
  }
  function a() {
    var e = "recentItemMenuItem_text_remove";
    return o() ? t.fetch({ key: u(e) }) : t.fetch({ key: e });
  }
  function f(e) {
    function t() {
      r.start(e, s.telemetry.leaveConversation.cta.TIMELINE_MENU);
    }
    if (!e)
      throw new Error("Parameter missing: conversation is required");
    n.call(this, f.TYPE, a(), t), this.isEnabled = function () {
      return r.canDeleteConversation(e);
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("ui/modalDialog/removeConversationHistoryDialog"), i = e("services/serviceLocator"), s = e("constants/common");
  return f.prototype = Object.create(n.prototype), f.TYPE = "RemoveConversationHistoryMenuItem", f;
})
