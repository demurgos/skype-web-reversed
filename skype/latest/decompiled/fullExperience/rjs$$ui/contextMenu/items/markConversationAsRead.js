define("ui/contextMenu/items/markConversationAsRead", [
  "require",
  "swx-constants",
  "ui/contextMenu/menuItem",
  "swx-i18n",
  "swx-service-locator-instance",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e) {
  function u(e) {
    function c() {
      var t = {
        unreadCount: f.unreadActivityItemsCount(),
        participantsCount: e.participantsCount()
      };
      f.markAllAsRead();
      h(t);
    }
    function h(e) {
      var n = t.telemetry.markConversationAsRead.TYPE;
      o.get().sendEvent(s.telemetry.uiTenantToken, n, e);
    }
    var a = r.fetch({ key: "recentItemMenuItem_text_markRead" }), f = e.historyService, l = i.resolve(t.serviceLocator.FEATURE_FLAGS);
    n.call(this, u.TYPE, a, c);
    this.isEnabled = function () {
      return l.isFeatureOn(t.featureFlags.CONTEXT_MENU_MARK_AS_READ_ENABLED) && f.unreadActivityItemsCount() > 0;
    };
  }
  var t = e("swx-constants").COMMON, n = e("ui/contextMenu/menuItem"), r = e("swx-i18n").localization, i = e("swx-service-locator-instance").default, s = e("experience/settings"), o = e("ui/telemetry/telemetryClient");
  return u.prototype = Object.create(n.prototype), u.TYPE = "MarkConversationAsReadMenuItem", u;
});
