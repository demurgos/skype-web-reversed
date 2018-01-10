define("ui/contextMenu/items/quoteMessage", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-service-locator-instance",
  "swx-constants",
  "swx-enums",
  "telemetry/chat/quoteMessageEvent",
  "ui/telemetry/actions/actionSources"
], function (e) {
  function a(e, f) {
    function h() {
      var e = u.contextMenuItem.quoteMessage;
      o.publish(f, e);
    }
    function p() {
      e.dispatchEvent(i.events.message.QUOTE, f, e.DIRECTION.PARENT);
      h();
    }
    if (!e || !f)
      throw new Error("Parameter missing: context and message are required");
    var l = t.fetch({ key: "chatLogmenuItem_text_quote" }), c = r.resolve(i.serviceLocator.FEATURE_FLAGS);
    n.call(this, a.TYPE, l, p);
    this.isEnabled = function () {
      var e = c.isFeatureOn(i.featureFlags.CONTEXT_MENU_QUOTE_MESSAGES_ENABLED);
      return e && !!f.text && !f.isDeleted() && f.type() !== s.activityType.SystemMessage;
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("swx-service-locator-instance").default, i = e("swx-constants").COMMON, s = e("swx-enums"), o = e("telemetry/chat/quoteMessageEvent"), u = e("ui/telemetry/actions/actionSources");
  return a.prototype = Object.create(n.prototype), a.TYPE = "QuoteMessageMenuItem", a;
});
