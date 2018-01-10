define("ui/contextMenu/items/copySelectionMenuItem", [
  "require",
  "swx-constants",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-service-locator-instance",
  "telemetry/chat/quoteMessageEvent",
  "ui/telemetry/actions/actionSources",
  "swx-enums",
  "utils/chat/quoteMessageUtils",
  "swx-cafe-application-instance",
  "utils/common/clipboard"
], function (e) {
  function c(e, h, p) {
    function g(e) {
      var t = o.contextMenuItem.copySelection;
      s.publish(h, t, e);
    }
    function y() {
      var e = a.copySelectionAsQuote(h, p, m);
      g(e);
    }
    if (!e || !h || !p)
      throw new Error("Parameter missing: context, message and textSelection are required");
    var d = n.fetch({ key: "chatLogmenuItem_text_copySelection" }), v = i.resolve(t.serviceLocator.FEATURE_FLAGS), m = f.get().conversationsManager;
    r.call(this, c.TYPE, d, y);
    this.isEnabled = function () {
      var e = v.isFeatureOn(t.featureFlags.CONTEXT_MENU_COPY_MESSAGES_ENABLED), n = l.isCopySupportedByBrowser();
      return n && e && !!h.text && !h.isDeleted() && h.type() !== u.activityType.SystemMessage;
    };
  }
  var t = e("swx-constants").COMMON, n = e("swx-i18n").localization, r = e("ui/contextMenu/menuItem"), i = e("swx-service-locator-instance").default, s = e("telemetry/chat/quoteMessageEvent"), o = e("ui/telemetry/actions/actionSources"), u = e("swx-enums"), a = e("utils/chat/quoteMessageUtils"), f = e("swx-cafe-application-instance"), l = e("utils/common/clipboard");
  return c.prototype = Object.create(r.prototype), c.TYPE = "CopySelectionMenuItem", c;
});
