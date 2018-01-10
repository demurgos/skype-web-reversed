define("ui/contextMenu/items/copyMessageMenuItem", [
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
  function c(e, h) {
    function m(e) {
      var t = o.contextMenuItem.copyMessage;
      s.publish(h, t, e);
    }
    function g() {
      var e = a.copyMessageAsQuote(h, v);
      m(e);
    }
    if (!e || !h)
      throw new Error("Parameter missing: context and message are required");
    var p = n.fetch({ key: "chatLogmenuItem_text_copy" }), d = i.resolve(t.serviceLocator.FEATURE_FLAGS), v = f.get().conversationsManager;
    r.call(this, c.TYPE, p, g);
    this.isEnabled = function () {
      var e = d.isFeatureOn(t.featureFlags.CONTEXT_MENU_COPY_MESSAGES_ENABLED), n = l.isCopySupportedByBrowser();
      return n && e && !!h.text && !h.isDeleted() && h.type() !== u.activityType.SystemMessage;
    };
  }
  var t = e("swx-constants").COMMON, n = e("swx-i18n").localization, r = e("ui/contextMenu/menuItem"), i = e("swx-service-locator-instance").default, s = e("telemetry/chat/quoteMessageEvent"), o = e("ui/telemetry/actions/actionSources"), u = e("swx-enums"), a = e("utils/chat/quoteMessageUtils"), f = e("swx-cafe-application-instance"), l = e("utils/common/clipboard");
  return c.prototype = Object.create(r.prototype), c.TYPE = "CopyMessageMenuItem", c;
});
