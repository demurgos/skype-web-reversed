define("ui/contextMenu/items/copySelectionTextMenuItem", [
  "require",
  "swx-constants",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-service-locator-instance",
  "telemetry/chat/quoteMessageEvent",
  "ui/telemetry/actions/actionSources",
  "swx-enums",
  "utils/common/clipboard",
  "swx-cafe-application-instance"
], function (e) {
  function l(e, c, h) {
    function m(e) {
      var t = o.contextMenuItem.copySelectionText;
      s.publish(c, t, e);
    }
    function g() {
      var e = a.copyText(h);
      v._setMessageCopiedToCache(undefined);
      m(e);
    }
    if (!e || !c || !h)
      throw new Error("Parameter missing: context, message and textSelection are required");
    var p = n.fetch({ key: "chatLogmenuItem_text_copyText" }), d = i.resolve(t.serviceLocator.FEATURE_FLAGS), v = f.get().conversationsManager;
    r.call(this, l.TYPE, p, g);
    this.isEnabled = function () {
      var e = d.isFeatureOn(t.featureFlags.CONTEXT_MENU_COPY_MESSAGES_ENABLED), n = a.isCopySupportedByBrowser();
      return n && e && !!c.text && !c.isDeleted() && c.type() !== u.activityType.SystemMessage;
    };
  }
  var t = e("swx-constants").COMMON, n = e("swx-i18n").localization, r = e("ui/contextMenu/menuItem"), i = e("swx-service-locator-instance").default, s = e("telemetry/chat/quoteMessageEvent"), o = e("ui/telemetry/actions/actionSources"), u = e("swx-enums"), a = e("utils/common/clipboard"), f = e("swx-cafe-application-instance");
  return l.prototype = Object.create(r.prototype), l.TYPE = "CopySelectionTextMenuItem", l;
});
