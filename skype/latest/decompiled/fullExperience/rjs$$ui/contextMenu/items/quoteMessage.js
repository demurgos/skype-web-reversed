define("ui/contextMenu/items/quoteMessage", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "services/serviceLocator",
  "constants/common",
  "swx-enums"
], function (e) {
  function o(e, u) {
    function l() {
      e.dispatchEvent(i.events.message.QUOTE, u, e.DIRECTION.PARENT);
    }
    if (!e || !u)
      throw new Error("Parameter missing: context and message are required");
    var a = t.fetch({ key: "chatLogmenuItem_text_quote" }), f = r.resolve(i.serviceLocator.FEATURE_FLAGS);
    n.call(this, o.TYPE, a, l);
    this.isEnabled = function () {
      var e = f.isFeatureOn(i.featureFlags.CONTEXT_MENU_QUOTE_MESSAGES_ENABLED);
      return e && !!u.text && !u.isDeleted() && u.type() !== s.activityType.SystemMessage;
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("services/serviceLocator"), i = e("constants/common"), s = e("swx-enums");
  return o.prototype = Object.create(n.prototype), o.TYPE = "QuoteMessageMenuItem", o;
});
