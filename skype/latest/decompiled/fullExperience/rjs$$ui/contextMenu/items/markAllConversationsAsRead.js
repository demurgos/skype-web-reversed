define("ui/contextMenu/items/markAllConversationsAsRead", [
  "require",
  "swx-constants",
  "ui/contextMenu/menuItem",
  "swx-i18n",
  "swx-cafe-application-instance",
  "swx-service-locator-instance",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e) {
  function a(e) {
    function h() {
      var e = { unreadConversationsCount: c._allUnreadConversationsCount() }, t = c._allUnreadConversations().map(function (e) {
          return e.id;
        });
      t.forEach(function (e) {
        var t = c._getOrCreateConversation(e).historyService;
        t.markAllAsRead();
      });
      p(e);
    }
    function p(e) {
      var n = t.telemetry.markAllConversationsAsRead.TYPE;
      u.get().sendEvent(o.telemetry.uiTenantToken, n, e);
    }
    var f = r.fetch({ key: "recentItemMenuItem_text_markAllConversationsRead" }), l = s.resolve(t.serviceLocator.FEATURE_FLAGS), c = i.get().conversationsManager;
    n.call(this, a.TYPE, f, h);
    this.isEnabled = function () {
      return l.isFeatureOn(t.featureFlags.CONTEXT_MENU_MARK_AS_READ_ENABLED) && c._allUnreadConversationsCount() > 0 && (e.historyService.unreadActivityItemsCount() === 0 || c._allUnreadConversationsCount() > 1);
    };
  }
  var t = e("swx-constants").COMMON, n = e("ui/contextMenu/menuItem"), r = e("swx-i18n").localization, i = e("swx-cafe-application-instance"), s = e("swx-service-locator-instance").default, o = e("experience/settings"), u = e("ui/telemetry/telemetryClient");
  return a.prototype = Object.create(n.prototype), a.TYPE = "MarkAllConversationsAsReadMenuItem", a;
});
